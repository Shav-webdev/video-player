'use client';

import { useState, useRef, useCallback } from 'react';
import { Chapter } from '@/types/video';
import { Icon } from '@/components/icon/Icon';
import { Tooltip } from '@/components/VideoPlayer/Tooltip';
import { ChapterSegments } from './ChapterSegments';
import { formatTime } from '@/utils/timeFormatter';

interface TimelineProps {
  currentTime: number;
  duration: number;
  chapters: Chapter[];
  onSeek: (time: number) => void;
}

export function Timeline({ currentTime, duration, chapters, onSeek }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Find chapter at a given time
  const findChapterAtTime = useCallback(
    (time: number): Chapter | undefined => {
      return chapters.find((ch) => time >= ch.start && time <= ch.end);
    },
    [chapters]
  );

  // Calculate time from mouse position
  const getTimeFromPosition = useCallback(
    (clientX: number): number => {
      if (!timelineRef.current) return 0;
      const rect = timelineRef.current.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      return percentage * duration;
    },
    [duration]
  );

  // Handle mouse move on timeline
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const time = getTimeFromPosition(e.clientX);
      setHoverTime(time);
      setIsHovering(true);
    },
    [getTimeFromPosition]
  );

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setHoverTime(null);
  }, []);

  // Handle click on timeline
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const time = getTimeFromPosition(e.clientX);
      onSeek(time);
    },
    [getTimeFromPosition, onSeek]
  );

  // Handle touch events for mobile
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const time = getTimeFromPosition(touch.clientX);
        setHoverTime(time);
        setIsHovering(true);
      }
    },
    [getTimeFromPosition]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        const time = getTimeFromPosition(touch.clientX);
        onSeek(time);
        setIsHovering(false);
        setHoverTime(null);
      }
    },
    [getTimeFromPosition, onSeek]
  );

  const hoveredChapter = hoverTime !== null ? findChapterAtTime(hoverTime) : null;
  const hoverPosition = hoverTime !== null ? (hoverTime / duration) * 100 : 0;

  return (
    <div className="relative w-full bottom-2.5">
      <div
        ref={timelineRef}
        className="relative h-1 bg-transparent rounded-full cursor-pointer group transition-all touch-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Chapter segments - divided timeline */}
        <ChapterSegments
          chapters={chapters}
          duration={duration}
          hoveredChapter={hoveredChapter}
          isHovering={isHovering}
        />

        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 h-1 bg-[#F6F9FF] rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />

        {/* Progress handle */}
        <Icon
          name="18/tracker"
          className="absolute top-1/2 -translate-y-1/2 z-10 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${progress}% - 8px)` }}
        />

        {/* Hover indicator */}
        {isHovering && hoverTime !== null && (
          <div
            className="absolute top-0 h-1 w-0.5 bg-white opacity-70"
            style={{ left: `${hoverPosition}%` }}
          />
        )}
      </div>

      {/* Tooltip */}
      {isHovering && hoverTime !== null && (
        <Tooltip
          leftPercent={hoverPosition}
          title={formatTime(hoverTime)}
          subtitle={hoveredChapter?.title}
        />
      )}
    </div>
  );
}
