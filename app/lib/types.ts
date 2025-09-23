export interface Star {
  radius: number;
  distanceFromCenter: number;
  angle: number;
  speed: number;
  parallax: number;
  opacity: number;
  twinkleSpeed: number;
}

export interface Comet {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  life: number;
}

export interface SpotifySong {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  progress: number;
  duration: number;
}

export interface MediumArticle {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}

export interface ProjectType {
  title: string;
  technologies: string[];
  description: string;
  repoUrl: string;
  liveUrl?: string;
}
