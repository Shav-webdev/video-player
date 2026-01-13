import { Chapter } from '@/types/video';

interface ChapterSegmentsProps {
  chapters: Chapter[];
  duration: number;
  hoveredChapter: Chapter | null | undefined;
  isHovering: boolean;
}

export function ChapterSegments({
  chapters,
  duration,
  hoveredChapter,
  isHovering,
}: ChapterSegmentsProps) {
  return (
    <>
      {chapters.map((chapter, index) => {
        const startPercent = (chapter.start / duration) * 100;
        const widthPercent = ((chapter.end - chapter.start) / duration) * 100;
        const isHovered = hoveredChapter === chapter && isHovering;

        return (
          <div
            key={index}
            className="absolute transition-all"
            style={{
              left: `calc(${startPercent}% + 2px)`,
              width: `calc(${widthPercent}% - 4px)`,
              height: '4px',
              borderRadius: '1px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: isHovered ? '#76A4F9' : '#8B8EA4',
            }}
          />
        );
      })}
    </>
  );
}
