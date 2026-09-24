export interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  channel: string;
  url: string;
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
  textOverlay?: string;
  transition?: 'none' | 'fade' | 'zoom' | 'slide';
  captionStyle?: 'bold' | 'minimal' | 'karaoke' | 'highlight';
  cropPosition?: number; // 0-100 horizontal crop position for 9:16
}

export interface ExportSettings {
  resolution: '1080x1920' | '720x1280' | '2160x3840';
  fps: 30 | 60;
  format: 'mp4' | 'webm';
  quality: 'high' | 'medium' | 'low';
  addCaptions: boolean;
  addTransitions: boolean;
  backgroundColor: string;
}
