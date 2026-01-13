'use client';

import { useCallback } from 'react';
import { Icon } from '@/components/icon/Icon';

interface FullscreenButtonProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export function FullscreenButton({ videoRef }: FullscreenButtonProps) {
  const handleToggleFullscreen = useCallback(() => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  }, [videoRef]);

  return (
    <button
      onClick={handleToggleFullscreen}
      className="flex items-center justify-center w-6 h-6 hover:opacity-80 transition-opacity"
      aria-label="Toggle fullscreen"
    >
      <Icon
        name="18/fullScreen"
        className="w-5 h-5 text-white"
      />
    </button>
  );
}
