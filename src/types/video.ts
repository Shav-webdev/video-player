export interface Chapter {
  title: string;
  start: number; // seconds
  end: number;   // seconds
}

export interface VideoPlayerData {
  hlsPlaylistUrl: string;
  videoLength: number; // seconds
  chapters: Chapter[];
}

export interface VideoPlayerProps {
  data: VideoPlayerData;
}
