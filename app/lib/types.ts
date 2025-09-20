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