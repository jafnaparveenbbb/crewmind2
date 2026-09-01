const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const baseDir = 'c:\\Users\\BBB\\Desktop\\significo\\src\\assets\\significo';

const assetsToDownload = [
  // Videos
  {
    folder: 'videos',
    filename: 'hero-video.mp4',
    url: 'https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/bBj1XfrSyi/1ENIoa5sjq'
  },
  {
    folder: 'videos',
    filename: 'hero-video-mob.mp4',
    url: 'https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/qN8PSufRju/N_y9JxwmVC'
  },
  // Hero Placeholders
  {
    folder: 'hero',
    filename: 'hero-placeholder-pc.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d34831b9_placeholder.png'
  },
  {
    folder: 'hero',
    filename: 'hero-placeholder-mob.jpeg',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d34831bc_Placeholder%20mob.jpeg'
  },
  // Circular Hero Portraits (24 total)
  {
    folder: 'portraits',
    filename: 'portrait-01.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483189_Ellipse%20845-1.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-02.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483184_Ellipse%20845.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-03.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483188_Ellipse%20845-2.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-04.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483185_Ellipse%20844.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-05.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483183_Ellipse%20845-6.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-06.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483184_Ellipse%20845.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-07.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483183_Ellipse%20845-6.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-08.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d348317a_Ellipse%20845-10.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-09.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483181_Ellipse%20845-5.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-10.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d348317e_Ellipse%20845-7.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-11.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483180_Ellipse%20845-4.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-12.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483182_Ellipse%20845-8.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-13.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483184_Ellipse%20845.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-14.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483185_Ellipse%20844.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-15.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483183_Ellipse%20845-6.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-16.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483195_Ellipse%20845.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-17.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483189_Ellipse%20845-1.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-18.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d348317a_Ellipse%20845-10.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-19.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483182_Ellipse%20845-8.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-20.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483180_Ellipse%20845-4.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-21.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483181_Ellipse%20845-5.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-22.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d348317a_Ellipse%20845-10.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-23.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483189_Ellipse%20845-1.png'
  },
  {
    folder: 'portraits',
    filename: 'portrait-24.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483188_Ellipse%20845-2.png'
  },

  // Horizontal Stats Images (12 total)
  {
    folder: 'horizontal',
    filename: 'horizontal-01.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d34831b1_horizontal%20imgs%2001.webp'
  },
  {
    folder: 'horizontal',
    filename: 'horizontal-02.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483174_horizontal%20imgs%2003.webp'
  },
  {
    folder: 'horizontal',
    filename: 'horizontal-03.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483177_horizontal%20imgs%2004.webp'
  },
  {
    folder: 'horizontal',
    filename: 'horizontal-04.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d34831b0_horizontal%20imgs%2002.webp'
  },
  {
    folder: 'horizontal',
    filename: 'horizontal-05.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d34831b6_horizontal%20imgs%2005.webp'
  },
  {
    folder: 'horizontal',
    filename: 'horizontal-06.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d34831b2_horizontal%20imgs%2006.webp'
  },
  {
    folder: 'horizontal',
    filename: 'horizontal-07.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483178_horizontal%20imgs%2008.webp'
  },
  {
    folder: 'horizontal',
    filename: 'horizontal-08.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d34831b4_horizontal%20imgs%2007.webp'
  },
  {
    folder: 'horizontal',
    filename: 'horizontal-09.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483175_horizontal%20imgs%2010.webp'
  },
  {
    folder: 'horizontal',
    filename: 'horizontal-10.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d34831b3_horizontal%20imgs%2009.webp'
  },
  {
    folder: 'horizontal',
    filename: 'horizontal-11.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483172_horizontal%20imgs%2011.webp'
  },
  {
    folder: 'horizontal',
    filename: 'horizontal-12.webp',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d34831b5_horizontal%20imgs%2012.webp'
  },

  // Case Studies Deck
  {
    folder: 'case-studies',
    filename: 'case-study-01.jpeg',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/681ccc2dbdcc7d4545b8f4c9_66d8d01f148f6a611a9156eb_redd-f-5U_28ojjgms-unsplash.jpeg'
  },
  {
    folder: 'case-studies',
    filename: 'case-study-02.jpg',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/681cd8cbd230fb8d7642f467_madison-lavern-4gcqRf3-f2I-unsplash.jpg'
  },
  {
    folder: 'case-studies',
    filename: 'case-study-03.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/681ccc2b02a77341c93ededb_6644f35fe5aead2d9d274917_Untitled%2520design-10.png'
  },
  {
    folder: 'case-studies',
    filename: 'team-adrian.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d348325c_655d50b27e70d440e4404528_AdriaCC81n20Rubio.png'
  },
  {
    folder: 'case-studies',
    filename: 'team-victor.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832e6_655d504bfd0e67e20640dbbd_ViCC81ctor20Albertos.png'
  },
  {
    folder: 'case-studies',
    filename: 'team-fenn.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832cf_Fenn.png'
  },
  {
    folder: 'case-studies',
    filename: 'team-himanshu.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832cb_655d502526e8af193b622f52_Himanshu20Bansal.png'
  },
  {
    folder: 'case-studies',
    filename: 'team-carlos.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d3483260_655d50a1fe8ae91c70ebaf0e_Carlos20Cubillos.png'
  },
  {
    folder: 'case-studies',
    filename: 'team-damiano.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832c8_655d50534334a9955739345a_Damiano20Stingone.png'
  },
  {
    folder: 'case-studies',
    filename: 'team-laura.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832d2_655d5089fe8ae91c70eb9c41_Laura20CaCC81rdenas.png'
  },
  {
    folder: 'case-studies',
    filename: 'team-mara.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832d7_655d4f8bf10226a8c5d06a93_Mara20OCC88zuCC88tok.png'
  },

  // Team Section
  {
    folder: 'team',
    filename: 'team-01-rick.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d3483259_Rick%20McCartney%20.png'
  },
  {
    folder: 'team',
    filename: 'team-02-chris.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832ae_655d505c9d551c9c11dd3613_Chris20Koha.png'
  },
  {
    folder: 'team',
    filename: 'team-03-caroline.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d3483297_655d5077c62c03c26afcfff2_Caroline20Nieto.png'
  },
  {
    folder: 'team',
    filename: 'team-04-victor.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832e6_655d504bfd0e67e20640dbbd_ViCC81ctor20Albertos.png'
  },
  {
    folder: 'team',
    filename: 'team-05-adrian.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d348325c_655d50b27e70d440e4404528_AdriaCC81n20Rubio.png'
  },

  // Testimonials
  {
    folder: 'testimonials',
    filename: 'testimonial-miranda.jpeg',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832e5_MirandaErnst.jpeg'
  },
  {
    folder: 'testimonials',
    filename: 'testimonial-emek.jpg',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d3483253_EmekAltun.jpg'
  },

  // Insights & Articles
  {
    folder: 'insights',
    filename: 'insight-01.jpg',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/68406c4fac2acfa27649dbfe_digital-therapeutics.jpg'
  },
  {
    folder: 'insights',
    filename: 'insight-02.png',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/681ccfe12a3e6b1c7de99357_67d86e45e598770807a15d27_Rectangle%25201.png'
  },

  // Misc
  {
    folder: 'misc',
    filename: 'scroll-up.svg',
    url: 'https://cdn.prod.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d348317c_ScrollUp.svg'
  }
];

function downloadFile(item) {
  return new Promise((resolve, reject) => {
    const targetDir = path.join(baseDir, item.folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const targetPath = path.join(targetDir, item.filename);

    const client = item.url.startsWith('https') ? https : http;
    const req = client.get(item.url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile({ ...item, url: res.headers.location }).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with HTTP ${res.statusCode}: ${item.url}`));
      }

      const fileStream = fs.createWriteStream(targetPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        const stat = fs.statSync(targetPath);
        console.log(`[OK] ${item.folder}/${item.filename} (${stat.size} bytes)`);
        resolve();
      });
      fileStream.on('error', reject);
    });

    req.on('error', reject);
  });
}

async function downloadAll() {
  console.log(`Starting download of ${assetsToDownload.length} Significo assets...`);
  for (let i = 0; i < assetsToDownload.length; i++) {
    const item = assetsToDownload[i];
    try {
      await downloadFile(item);
    } catch (err) {
      console.error(`[ERROR] ${item.folder}/${item.filename}: ${err.message}`);
    }
  }
  console.log('Finished downloading assets!');
}

downloadAll();
