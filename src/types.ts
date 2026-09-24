export interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  channel: string;
  url: string;
  views?: string;
  uploadDate?: string;
}

export interface Clip {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  duration: number;
  score: number;
  tags: string[];
  thumbnail: string;
  highlight?: string;
  textOverlay?: string;
  transition?: 'none' | 'fade' | 'zoom' | 'slide' | 'glitch';
  captionStyle?: 'bold' | 'minimal' | 'karaoke' | 'highlight' | 'typewriter';
  cropPosition?: number;
  cropZoom?: number;
  speed?: number;
  filter?: string;
  backgroundColor?: string;
  selected?: boolean;
}

export interface ExportSettings {
  resolution: '1080x1920' | '720x1280' | '2160x3840';
  fps: 30 | 60;
  format: 'mp4' | 'webm' | 'mov';
  quality: 'high' | 'medium' | 'low';
  addCaptions: boolean;
  addTransitions: boolean;
  backgroundColor: string;
  autoReframe: boolean;
  normalizeAudio: boolean;
}
