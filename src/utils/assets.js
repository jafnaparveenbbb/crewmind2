// Local Crewmind Assets Registry (Cleaned & Optimized)

// Videos & Placeholders
import heroVideo from '../assets/significo/videos/herovideo.mp4';

// Horizontal Stats Parallax Images (Active items)
import horiz07 from '../assets/significo/horizontal/horizontal-07.webp';
import horiz08 from '../assets/significo/horizontal/horizontal-08.webp';
import horiz09 from '../assets/significo/horizontal/horizontal-09.webp';
import horiz10 from '../assets/significo/horizontal/horizontal-10.webp';
import horiz11 from '../assets/significo/horizontal/horizontal-11.webp';
import horiz12 from '../assets/significo/horizontal/horizontal-12.webp';

// Misc
import scrollUpSvg from '../assets/significo/misc/scroll-up.svg';
import mainLogo from '../assets/significo/misc/main-logo.png';

// Crew Images (crewimg1 through crewimg8)
import crewimg1 from '../assets/crew/crewimg1.jpeg';
import crewimg2 from '../assets/crew/crewimg2.jpeg';
import crewimg3 from '../assets/crew/crewimg3.jpg';
import crewimg4 from '../assets/crew/crewimg4.avif';
import crewimg5 from '../assets/crew/crewimg5.jpeg';
import crewimg6 from '../assets/crew/crewimg6.jpeg';
import crewming7 from '../assets/crew/crewming7.jpeg';
import crewimg8 from '../assets/crew/crewimg8.jpeg';

export const CREW_IMAGES = [
  crewming7,
  crewimg2,
  crewimg6,
  crewimg1,
  crewimg5,
  crewimg8
];

export const ASSETS = {
  misc: {
    scrollUp: scrollUpSvg,
    mainLogo: mainLogo
  },
  crew: [crewimg8, crewimg2, crewimg3, crewimg4, crewimg5, crewimg6, crewming7, crewimg1],
  hero: {
    videoDesktop: heroVideo,
    circles: [
      { name: "creative", img: crewimg8 },
      { name: "inclusive", img: crewimg2 },
      { name: "intuitive", img: crewimg3 },
      { name: "elegant", img: crewimg4 },
      { name: "refined", img: crewimg5 },
      { name: "useful", img: crewimg6 },
      { name: "thoughtful", img: crewming7 },
      { name: "bold", img: crewimg1 },
      { name: "innovative", img: crewimg8 },
      { name: "simple", img: crewimg2 },
      { name: "purposeful", img: crewimg3 },
      { name: "human", img: crewimg4 },
      { name: "essential", img: crewimg5 },
      { name: "timeless", img: crewimg6 },
      { name: "focused", img: crewming7 },
      { name: "reliable", img: crewimg1 },
      { name: "useful2", img: crewimg8 },
      { name: "useful3", img: crewimg2 },
      { name: "purposful", img: crewimg3 },
      { name: "ethical", img: crewimg4 },
      { name: "insightful", img: crewimg5 },
      { name: "useful4", img: crewimg6 },
      { name: "adaptive", img: crewming7 },
      { name: "dynamic", img: crewimg1 }
    ]
  },
  horizontal: [
    crewming7,
    crewimg2,
    crewimg6,
    crewimg1,
    crewimg5,
    crewimg8,
    horiz07, horiz08,
    horiz09, horiz10, horiz11, horiz12
  ]
};
