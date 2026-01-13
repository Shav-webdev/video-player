import { Chapter } from '@/types/video';

interface ChapterMarkerProps {
  chapter: Chapter;
  position: number; // percentage (0-100)
  videoLength: number;
}

export function ChapterMarker({ chapter, position, videoLength }: ChapterMarkerProps) {
  return (
    <div
      className="absolute top-0 h-full w-0.5 bg-[#8B8EA4] hover:bg-blue-300 transition-colors cursor-pointer"
      style={{ left: `${position}%` }}
      title={chapter.title}
    />
  );
}
