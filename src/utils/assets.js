// Local Significo Assets Registry

// Videos & Placeholders
import heroVideo from '../assets/significo/videos/hero-video.mp4';
import heroVideoMob from '../assets/significo/videos/hero-video-mob.mp4';
import heroPlaceholderPc from '../assets/significo/hero/hero-placeholder-pc.png';
import heroPlaceholderMob from '../assets/significo/hero/hero-placeholder-mob.jpeg';

// Portraits (24 circular portrait photos for the first typographic field)
import portrait01 from '../assets/significo/portraits/portrait-01.png';
import portrait02 from '../assets/significo/portraits/portrait-02.png';
import portrait03 from '../assets/significo/portraits/portrait-03.png';
import portrait04 from '../assets/significo/portraits/portrait-04.png';
import portrait05 from '../assets/significo/portraits/portrait-05.png';
import portrait06 from '../assets/significo/portraits/portrait-06.png';
import portrait07 from '../assets/significo/portraits/portrait-07.png';
import portrait08 from '../assets/significo/portraits/portrait-08.png';
import portrait09 from '../assets/significo/portraits/portrait-09.png';
import portrait10 from '../assets/significo/portraits/portrait-10.png';
import portrait11 from '../assets/significo/portraits/portrait-11.png';
import portrait12 from '../assets/significo/portraits/portrait-12.png';
import portrait13 from '../assets/significo/portraits/portrait-13.png';
import portrait14 from '../assets/significo/portraits/portrait-14.png';
import portrait15 from '../assets/significo/portraits/portrait-15.png';
import portrait16 from '../assets/significo/portraits/portrait-16.png';
import portrait17 from '../assets/significo/portraits/portrait-17.png';
import portrait18 from '../assets/significo/portraits/portrait-18.png';
import portrait19 from '../assets/significo/portraits/portrait-19.png';
import portrait20 from '../assets/significo/portraits/portrait-20.png';
import portrait21 from '../assets/significo/portraits/portrait-21.png';
import portrait22 from '../assets/significo/portraits/portrait-22.png';
import portrait23 from '../assets/significo/portraits/portrait-23.png';
import portrait24 from '../assets/significo/portraits/portrait-24.png';

// Horizontal Stats Parallax Images (12 items)
import horiz01 from '../assets/significo/horizontal/horizontal-01.webp';
import horiz02 from '../assets/significo/horizontal/horizontal-02.webp';
import horiz03 from '../assets/significo/horizontal/horizontal-03.webp';
import horiz04 from '../assets/significo/horizontal/horizontal-04.webp';
import horiz05 from '../assets/significo/horizontal/horizontal-05.webp';
import horiz06 from '../assets/significo/horizontal/horizontal-06.webp';
import horiz07 from '../assets/significo/horizontal/horizontal-07.webp';
import horiz08 from '../assets/significo/horizontal/horizontal-08.webp';
import horiz09 from '../assets/significo/horizontal/horizontal-09.webp';
import horiz10 from '../assets/significo/horizontal/horizontal-10.webp';
import horiz11 from '../assets/significo/horizontal/horizontal-11.webp';
import horiz12 from '../assets/significo/horizontal/horizontal-12.webp';

// Case Studies & Contributor Avatars
import caseStudy01 from '../assets/significo/case-studies/case-study-01.jpeg';
import caseStudy02 from '../assets/significo/case-studies/case-study-02.jpg';
import caseStudy03 from '../assets/significo/case-studies/case-study-03.png';

import teamAdrian from '../assets/significo/case-studies/team-adrian.png';
import teamVictor from '../assets/significo/case-studies/team-victor.png';
import teamFenn from '../assets/significo/case-studies/team-fenn.png';
import teamHimanshu from '../assets/significo/case-studies/team-himanshu.png';
import teamCarlos from '../assets/significo/case-studies/team-carlos.png';
import teamDamiano from '../assets/significo/case-studies/team-damiano.png';
import teamLaura from '../assets/significo/case-studies/team-laura.png';
import teamMara from '../assets/significo/case-studies/team-mara.png';

// Team Section Avatars
import teamRickLg from '../assets/significo/team/team-01-rick.png';
import teamChrisLg from '../assets/significo/team/team-02-chris.png';
import teamCarolineLg from '../assets/significo/team/team-03-caroline.png';
import teamVictorLg from '../assets/significo/team/team-04-victor.png';
import teamAdrianLg from '../assets/significo/team/team-05-adrian.png';

// Testimonial Avatars
import testimonialMiranda from '../assets/significo/testimonials/testimonial-miranda.jpeg';
import testimonialEmek from '../assets/significo/testimonials/testimonial-emek.jpg';

// Insights & Articles Images
import insight01 from '../assets/significo/insights/insight-01.jpg';
import insight02 from '../assets/significo/insights/insight-02.png';

// Misc
import scrollUpSvg from '../assets/significo/misc/scroll-up.svg';

export const ASSETS = {
  hero: {
    videoDesktop: heroVideo,
    videoMobile: heroVideoMob,
    placeholderPc: heroPlaceholderPc,
    placeholderMob: heroPlaceholderMob,
    circles: [
      { name: "creative", img: portrait01 },
      { name: "inclusive", img: portrait02 },
      { name: "intuitive", img: portrait03 },
      { name: "elegant", img: portrait04 },
      { name: "refined", img: portrait05 },
      { name: "useful", img: portrait06 },
      { name: "thoughtful", img: portrait07 },
      { name: "bold", img: portrait08 },
      { name: "empathetic", img: portrait09 },
      { name: "curious", img: portrait10 },
      { name: "empathetic2", img: portrait11 },
      { name: "useful2", img: portrait12 },
      { name: "cohesive", img: portrait13 },
      { name: "balanced", img: portrait14 },
      { name: "functional", img: portrait15 },
      { name: "authentic", img: portrait16 },
      { name: "agile", img: portrait17 },
      { name: "useful3", img: portrait18 },
      { name: "purposful", img: portrait19 },
      { name: "ethical", img: portrait20 },
      { name: "insightful", img: portrait21 },
      { name: "useful4", img: portrait22 },
      { name: "adaptive", img: portrait23 },
      { name: "dynamic", img: portrait24 }
    ]
  },
  horizontal: [
    horiz01, horiz02, horiz03, horiz04,
    horiz05, horiz06, horiz07, horiz08,
    horiz09, horiz10, horiz11, horiz12
  ],
  caseStudies: [
    {
      title: "Digital health tool for large insurance company’s occupational health initiative",
      image: caseStudy01,
      theme: "light-purple",
      team: [
        { name: "Adrián Rubio", role: "VP of Engineering", img: teamAdrian },
        { name: "Víctor Albertos", role: "CTO", img: teamVictor },
        { name: "Fenn Lehmann", role: "Product Manager", img: teamFenn },
        { name: "Himanshu Bansal", role: "Senior QA Engineer", img: teamHimanshu },
        { name: "Carlos Cubillos", role: "Senior UX/UI Designer", img: teamCarlos }
      ],
      link: "#casestudy-1"
    },
    {
      title: "Stop Smoking App For A Major Insurance Provider",
      image: caseStudy02,
      theme: "light-blue",
      team: [
        { name: "Fenn Lehmann", role: "Product Manager", img: teamFenn },
        { name: "Himanshu Bansal", role: "Senior QA Engineer", img: teamHimanshu },
        { name: "Damiano Stingone", role: "Senior Designer", img: teamDamiano },
        { name: "Laura Cárdenas", role: "Visual Designer", img: teamLaura },
        { name: "Mara Özütok", role: "Health Concept Design", img: teamMara }
      ],
      link: "#casestudy-2"
    },
    {
      title: "A Smart Health And Wellness Coach For A Large Insurance Company",
      image: caseStudy03,
      theme: "tan",
      team: [
        { name: "Adrián Rubio", role: "VP of Engineering", img: teamAdrian },
        { name: "Víctor Albertos", role: "CTO", img: teamVictor },
        { name: "Laura Cárdenas", role: "Visual Designer", img: teamLaura },
        { name: "Damiano Stingone", role: "Senior Designer", img: teamDamiano },
        { name: "Himanshu Bansal", role: "Senior QA Engineer", img: teamHimanshu }
      ],
      link: "#casestudy-3"
    }
  ],
  testimonials: [
    {
      quote: "Working with the Significo team has been such a pleasure! We took on a significant project to rebuild our entire platform and the team approached the project with our best interests in mind. They continue to prioritize the end user experience and offer amazing expertise in all of the areas we lack internally. I would personally be lost without this team, their ability to problem solve, their openness to feedback and desire to build the product like it is their own.",
      name: "Miranda Ernst",
      role: "Product Manager",
      company: "HealthCheck360",
      avatar: testimonialMiranda
    },
    {
      quote: "Working with Significo and their recommendation service has been a game-changer for our occupational prevention efforts. Our customers are extremely satisfied with the tool's impressive technical capabilities and data-driven approach. But what truly sets it apart is the intuitive and modern user experience it offers, making it a breeze for our clients to navigate. By leveraging this service, our customers have successfully tackled presenteeism and absenteeism, making a significant impact on their workforce's well-being. We highly recommend Significo to any organization looking to optimize their occupational health and drive positive change.",
      name: "Emek Altun",
      role: "CEO",
      company: "Vitaservices",
      avatar: testimonialEmek
    }
  ],
  team: [
    {
      index: "01",
      name: "Dr. Rick McCartney",
      role: "CEO",
      avatar: teamRickLg
    },
    {
      index: "02",
      name: "Chris Koha",
      role: "COO",
      avatar: teamChrisLg
    },
    {
      index: "03",
      name: "Caroline Nieto",
      role: "Chief Product Officer",
      avatar: teamCarolineLg
    },
    {
      index: "04",
      name: "Víctor Albertos",
      role: "CTO",
      avatar: teamVictorLg
    },
    {
      index: "05",
      name: "Adrián Rubio",
      role: "VP of Engineering",
      avatar: teamAdrianLg
    }
  ],
  articles: [
    {
      title: "Digital Therapeutics Aren’t Drugs or Hardware.",
      subtitle: "A look at Reimbursement, Use, and Suggested Improvements",
      tag: "Thought Leadership",
      img: insight01,
      link: "#blog-1"
    },
    {
      title: "AI-leadership coaching to make work a healthier and happier place",
      subtitle: "Bunch meets people in the setting where they spend half of their waking hours: work, with action-oriented, 2-minute daily tips, personalized and adaptive using AI",
      tag: "Thought Leadership",
      img: insight02,
      link: "#blog-2"
    }
  ],
  misc: {
    scrollUp: scrollUpSvg
  }
};
