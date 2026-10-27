// Local Crewmind Assets Registry

// Videos & Placeholders
import heroVideo from '../assets/crewmind/videos/herovideo.mp4';
import heroVideoMob from '../assets/crewmind/videos/hero-video-mob-concert.mp4';
import heroPlaceholderPc from '../assets/crewmind/hero/hero-placeholder-pc.png';
import heroPlaceholderMob from '../assets/crewmind/hero/hero-placeholder-mob.jpeg';

// Crew Images (Exclusively crewimg1 through crewimg8)
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
  crew: [crewimg8, crewimg2, crewimg3, crewimg4, crewimg5, crewimg6, crewming7, crewimg1],
  hero: {
    videoDesktop: heroVideo,
    videoMobile: heroVideoMob,
    placeholderPc: heroPlaceholderPc,
    placeholderMob: heroPlaceholderMob,
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
  }
};
