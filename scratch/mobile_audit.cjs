const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = path.join(os.tmpdir(), 'chrome-mobile-audit-' + Date.now());

const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9225',
  `--user-data-dir=${userDataDir}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=390,844',
  'http://localhost:5173'
]);

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function runMobileAudit() {
  let version = null;
  for (let i = 0; i < 20; i++) {
    try {
      version = await fetchJson('http://127.0.0.1:9225/json/version');
      if (version) break;
    } catch (e) {
      await wait(300);
    }
  }

  const list = await fetchJson('http://127.0.0.1:9225/json/list');
  const page = list.find(p => p.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let id = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };
  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');

  await wait(4500);

  const viewports = [
    { name: 'iphone14_390', w: 390, h: 844 },
    { name: 'iphoneX_375', w: 375, h: 812 }
  ];

  const auditReport = {};

  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.w,
      height: vp.h,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true
    });
    await wait(400);

    // Refresh ScrollTrigger/Lenis on resize
    await send('Runtime.evaluate', {
      expression: `(() => {
        if (window.__lenis) window.__lenis.resize();
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      })()`
    });
    await wait(300);

    const data = await send('Runtime.evaluate', {
      expression: `(() => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const docW = document.documentElement.scrollWidth;

        // 1. Overall overflow check
        const hasDocOverflow = docW > W;
        const overflowingEls = [];
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          // ignore html/body/main/crewmind-app
          if (['HTML', 'BODY', 'MAIN'].includes(el.tagName)) return;
          if (r.right > W + 1) {
            overflowingEls.push({
              tag: el.tagName,
              className: el.className ? (typeof el.className === 'string' ? el.className.slice(0, 50) : '') : '',
              id: el.id,
              right: Math.round(r.right),
              excess: Math.round(r.right - W)
            });
          }
        });

        // 2. Header / Nav check
        const header = document.querySelector('.nav') || document.querySelector('header');
        const headerRect = header ? header.getBoundingClientRect() : null;
        const headerLogo = header ? header.querySelector('.nav__logo_img') : null;
        const headerLogoRect = headerLogo ? headerLogo.getBoundingClientRect() : null;
        const headerBtn = header ? header.querySelector('.link-hover') : null;
        const headerBtnRect = headerBtn ? headerBtn.getBoundingClientRect() : null;

        // 3. Hero Section check
        const hero = document.querySelector('.home-sticky');
        const heroBottomDescr = hero ? hero.querySelector('.hero__descr h4') : null;
        const heroBottomStyle = heroBottomDescr ? window.getComputedStyle(heroBottomDescr) : null;
        const heroRow4 = hero ? hero.querySelector('.hero__row--mobile-only') : null;
        const heroRow4Style = heroRow4 ? window.getComputedStyle(heroRow4) : null;

        // 4. About Section check
        const about = document.querySelector('.about-section');
        const aboutHeading = about ? about.querySelector('.about__heading') : null;
        const aboutHStyle = aboutHeading ? window.getComputedStyle(aboutHeading) : null;
        const aboutP = about ? about.querySelector('.about__paragraph') : null;
        const aboutPStyle = aboutP ? window.getComputedStyle(aboutP) : null;
        const pillars = about ? Array.from(about.querySelectorAll('.about-pillar-card')).map(p => {
          const r = p.getBoundingClientRect();
          const s = window.getComputedStyle(p);
          const title = p.querySelector('.about-pillar-card__title');
          const ts = title ? window.getComputedStyle(title) : null;
          return {
            w: Math.round(r.width),
            h: Math.round(r.height),
            aspectRatio: s.aspectRatio,
            titleFontSize: ts ? ts.fontSize : null,
            titleLineHeight: ts ? ts.lineHeight : null,
            text: p.innerText.replace(/\\n/g, ' ')
          };
        }) : [];

        // 5. Horizontal Stats check
        const stats = document.querySelector('.horizontal');
        const statsRect = stats ? stats.getBoundingClientRect() : null;
        const statsList = stats ? stats.querySelector('.horizontal__list') : null;
        const statsListRect = statsList ? statsList.getBoundingClientRect() : null;
        const statItems = stats ? Array.from(stats.querySelectorAll('.horizontal__item')).map(it => {
          const r = it.getBoundingClientRect();
          const num = it.querySelector('.f-140');
          const numStyle = num ? window.getComputedStyle(num) : null;
          const label = it.querySelector('.f-40');
          const labelStyle = label ? window.getComputedStyle(label) : null;
          return {
            w: Math.round(r.width),
            h: Math.round(r.height),
            numFontSize: numStyle ? numStyle.fontSize : null,
            labelFontSize: labelStyle ? labelStyle.fontSize : null,
            text: it.innerText.replace(/\\n/g, ' ').slice(0, 60)
          };
        }) : [];

        // 6. CoreValues ("The Industry is Changing") check
        const coreVal = document.querySelector('.crewmind-about-stats');
        const coreHeading = coreVal ? coreVal.querySelector('.core-values__heading') : null;
        const coreHStyle = coreHeading ? window.getComputedStyle(coreHeading) : null;
        const mobileTrack = coreVal ? coreVal.querySelector('.crewmind-about-stats__mobile-track') : null;
        const mobileTrackStyle = mobileTrack ? window.getComputedStyle(mobileTrack) : null;
        const coreCards = mobileTrack ? Array.from(mobileTrack.querySelectorAll('.crewmind-egg-card')).map(c => {
          const r = c.getBoundingClientRect();
          const h = c.querySelector('.capsule-topic-heading');
          const hs = h ? window.getComputedStyle(h) : null;
          const d = c.querySelector('.capsule-topic-desc');
          const ds = d ? window.getComputedStyle(d) : null;
          return {
            w: Math.round(r.width),
            h: Math.round(r.height),
            headingFontSize: hs ? hs.fontSize : null,
            descFontSize: ds ? ds.fontSize : null,
            title: h ? h.innerText.replace(/\\n/g, ' ') : '',
            desc: d ? d.innerText.replace(/\\n/g, ' ') : ''
          };
        }) : [];

        // 7. Services (IconCards) check
        const services = document.querySelector('.icon-cards-section');
        const servTitle = services ? services.querySelector('.f-64') : null;
        const servTitleStyle = servTitle ? window.getComputedStyle(servTitle) : null;
        const servCards = services ? Array.from(services.querySelectorAll('.cards__item')).map(c => {
          const r = c.getBoundingClientRect();
          const t = c.querySelector('.cards__item-title');
          const ts = t ? window.getComputedStyle(t) : null;
          const d = c.querySelector('.cards__item-desc');
          const ds = d ? window.getComputedStyle(d) : null;
          return {
            w: Math.round(r.width),
            h: Math.round(r.height),
            titleFontSize: ts ? ts.fontSize : null,
            descFontSize: ds ? ds.fontSize : null,
            title: t ? t.innerText : ''
          };
        }) : [];

        // 8. Management Partners check
        const mgmt = document.querySelector('.mgmt-section');
        const mgmtTitle = mgmt ? mgmt.querySelector('.mgmt-title') : null;
        const mgmtTitleStyle = mgmtTitle ? window.getComputedStyle(mgmtTitle) : null;
        const mgmtGrid = mgmt ? mgmt.querySelector('.zero-g-grid') : null;
        const mgmtGridStyle = mgmtGrid ? window.getComputedStyle(mgmtGrid) : null;
        const mgmtCards = mgmt ? Array.from(mgmt.querySelectorAll('.zero-g-card')).map(c => {
          const r = c.getBoundingClientRect();
          const t = c.querySelector('.zero-g-card__title');
          const ts = t ? window.getComputedStyle(t) : null;
          return {
            w: Math.round(r.width),
            h: Math.round(r.height),
            titleFontSize: ts ? ts.fontSize : null,
            title: t ? t.innerText : ''
          };
        }) : [];

        // 9. What Makes Us Different check
        const diff = document.querySelector('.ovals-diff-section');
        const diffHeading = diff ? diff.querySelector('.ovals-diff__heading') : null;
        const diffHStyle = diffHeading ? window.getComputedStyle(diffHeading) : null;
        const diffGrid = diff ? diff.querySelector('.diff-principles-grid') : null;
        const diffGridStyle = diffGrid ? window.getComputedStyle(diffGrid) : null;
        const diffCards = diff ? Array.from(diff.querySelectorAll('.diff-principle-card')).map(c => {
          const r = c.getBoundingClientRect();
          const t = c.querySelector('.diff-principle-card__title');
          const ts = t ? window.getComputedStyle(t) : null;
          return {
            w: Math.round(r.width),
            h: Math.round(r.height),
            titleFontSize: ts ? ts.fontSize : null,
            title: t ? t.innerText.replace(/\\n/g, ' ') : ''
          };
        }) : [];

        // 10. Closing CTA check
        const cta = document.querySelector('#cta');
        const ctaHeading = cta ? cta.querySelector('.f-64') : null;
        const ctaHStyle = ctaHeading ? window.getComputedStyle(ctaHeading) : null;
        const ctaScroll = cta ? cta.querySelector('.cta__scroll') : null;
        const ctaScrollRect = ctaScroll ? ctaScroll.getBoundingClientRect() : null;
        const ctaBtn = cta ? cta.querySelector('.cta__btn .btn') : null;
        const ctaBtnRect = ctaBtn ? ctaBtn.getBoundingClientRect() : null;

        // 11. Footer check
        const footer = document.querySelector('footer');
        const footerRect = footer ? footer.getBoundingClientRect() : null;
        const formInputs = footer ? Array.from(footer.querySelectorAll('input, textarea')).map(inp => {
          const r = inp.getBoundingClientRect();
          const s = window.getComputedStyle(inp);
          return {
            name: inp.name,
            w: Math.round(r.width),
            h: Math.round(r.height),
            fontSize: s.fontSize,
            padding: s.padding
          };
        }) : [];
        const submitBtn = footer ? footer.querySelector('.footer__submit-btn') : null;
        const submitRect = submitBtn ? submitBtn.getBoundingClientRect() : null;
        const backToTop = footer ? footer.querySelector('.footer__back-to-top') : null;
        const backToTopRect = backToTop ? backToTop.getBoundingClientRect() : null;
        const wordmark = footer ? footer.querySelector('.footer__wordmark-logo') : null;
        const wordmarkRect = wordmark ? wordmark.getBoundingClientRect() : null;
        const legalLinks = footer ? Array.from(footer.querySelectorAll('.footer__legal-item')).map(a => {
          const r = a.getBoundingClientRect();
          return { text: a.innerText, w: Math.round(r.width), h: Math.round(r.height) };
        }) : [];

        // 12. Scroll Arrow check
        const scrollArrow = document.querySelector('.scroll-arrow__sticky');
        const scrollArrowRect = scrollArrow ? scrollArrow.getBoundingClientRect() : null;

        return {
          viewport: { W, H, docW, hasDocOverflow },
          overflowingCount: overflowingEls.length,
          overflowingEls: overflowingEls.slice(0, 10),
          header: {
            rect: headerRect,
            logoRect: headerLogoRect,
            btnRect: headerBtnRect
          },
          hero: {
            descrFontSize: heroBottomStyle ? heroBottomStyle.fontSize : null,
            descrLineHeight: heroBottomStyle ? heroBottomStyle.lineHeight : null,
            row4Display: heroRow4Style ? heroRow4Style.display : null
          },
          about: {
            headingFontSize: aboutHStyle ? aboutHStyle.fontSize : null,
            paraFontSize: aboutPStyle ? aboutPStyle.fontSize : null,
            pillars
          },
          stats: {
            height: stats ? stats.offsetHeight : null,
            statItems
          },
          coreVal: {
            height: coreVal ? coreVal.offsetHeight : null,
            headingFontSize: coreHStyle ? coreHStyle.fontSize : null,
            trackDisplay: mobileTrackStyle ? mobileTrackStyle.display : null,
            cards: coreCards
          },
          services: {
            titleFontSize: servTitleStyle ? servTitleStyle.fontSize : null,
            cards: servCards
          },
          mgmt: {
            titleFontSize: mgmtTitleStyle ? mgmtTitleStyle.fontSize : null,
            gridColumns: mgmtGridStyle ? mgmtGridStyle.gridTemplateColumns : null,
            cards: mgmtCards
          },
          diff: {
            headingFontSize: diffHStyle ? diffHStyle.fontSize : null,
            gridColumns: diffGridStyle ? diffGridStyle.gridTemplateColumns : null,
            cards: diffCards
          },
          cta: {
            headingFontSize: ctaHStyle ? ctaHStyle.fontSize : null,
            scrollBadgeSize: ctaScrollRect ? { w: Math.round(ctaScrollRect.width), h: Math.round(ctaScrollRect.height) } : null,
            btnSize: ctaBtnRect ? { w: Math.round(ctaBtnRect.width), h: Math.round(ctaBtnRect.height) } : null
          },
          footer: {
            formInputs,
            submitBtnSize: submitRect ? { w: Math.round(submitRect.width), h: Math.round(submitRect.height) } : null,
            backToTopSize: backToTopRect ? { w: Math.round(backToTopRect.width), h: Math.round(backToTopRect.height) } : null,
            wordmarkSize: wordmarkRect ? { w: Math.round(wordmarkRect.width), h: Math.round(wordmarkRect.height) } : null,
            legalLinks
          },
          scrollArrow: {
            rect: scrollArrowRect
          }
        };
      })()`,
      returnByValue: true
    });

    auditReport[vp.name] = data.result.result.value;
  }

  fs.writeFileSync(path.resolve(__dirname, 'mobile_audit_results.json'), JSON.stringify(auditReport, null, 2));
  console.log('Mobile audit finished successfully!');

  ws.close();
  chromeProc.kill();
}

runMobileAudit().catch(e => {
  console.error('Audit failed:', e);
  chromeProc.kill();
  process.exit(1);
});
