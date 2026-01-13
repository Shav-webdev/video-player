'use client';

import { formatTime } from '@/utils/timeFormatter';
import { Icon } from '@/components/icon/Icon';
import { cn } from '@/utils/ui';

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
  onPlaybackRateChange: (rate: number) => void;
}

export function VideoControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  playbackRate,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
  onPlaybackRateChange,
}: VideoControlsProps) {
  return (
    <div className="flex items-center gap-3 text-white flex-1">
      {/* Play/Pause button */}
      <button
        onClick={onTogglePlay}
        className="flex items-center text-white justify-center cursor-pointer w-8 h-8 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:border-none"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        <Icon
          name={isPlaying ? '18/pause' : '18/play'}
          className="w-5 h-5 text-white stroke-white fill-white"
        />
      </button>

      {/* Volume control */}
      <button
        onClick={onToggleMute}
        className="flex items-center justify-center cursor-pointer w-6 h-6 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:border-none"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <Icon
          name="24/volume"
          className={cn(
            "w-5 h-5",
            (isMuted || volume === 0) && "opacity-50"
          )}
        />
      </button>

      {/* Time display */}
      <div className="text-sm font-medium">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
}
