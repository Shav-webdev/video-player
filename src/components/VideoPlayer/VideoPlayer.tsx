"use client";

import { useState, useCallback, useEffect } from "react";
import { VideoPlayerProps } from "@/types/video";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { VideoControls } from "./VideoControls";
import { Timeline } from "./Timeline";
import { ResolutionSelector } from "./ResolutionSelector";
import { ErrorOverlay } from "./ErrorOverlay";
import { FullscreenButton } from "./FullscreenButton";

export function VideoPlayer({ data }: VideoPlayerProps) {
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const {
    videoRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    setPlaybackRate,
    hls,
    error,
  } = useVideoPlayer(data.hlsPlaylistUrl, data.videoLength);

  // Auto-hide controls
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    setShowControls(true);
    const timeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
    setControlsTimeout(timeout);
  }, [controlsTimeout, isPlaying]);

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [isPlaying, currentTime]);


  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          seek(currentTime - 10);
          break;
        case "ArrowRight":
          e.preventDefault();
          seek(currentTime + 10);
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;
        case "KeyM":
          e.preventDefault();
          toggleMute();
          break;
        case "KeyF":
          e.preventDefault();
          if (videoRef.current) {
            if (!document.fullscreenElement) {
              videoRef.current.requestFullscreen().catch((err) => {
                console.error("Error attempting to enable fullscreen:", err);
              });
            } else {
              document.exitFullscreen();
            }
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    togglePlay,
    seek,
    currentTime,
    setVolume,
    volume,
    toggleMute,
    videoRef,
  ]);

  return (
    <div
      className="relative overflow-hidden group w-[960px] h-[541px] rounded-[10px] shrink-0"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 object-contain rounded-[10px] w-[960px] h-[541px] shrink-0"
        playsInline
        onClick={togglePlay}
      />

      {/* Error message */}
      {error && (
        <ErrorOverlay message={error.message} onReload={() => window.location.reload()} />
      )}

      {/* Controls overlay */}
      <div
        className={`absolute bottom-[10px] left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 w-[930px] mx-auto ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Timeline */}
          <Timeline
            currentTime={currentTime}
            duration={duration || data.videoLength}
            chapters={data.chapters}
            onSeek={seek}
          />

        {/* Controls */}
        <div className="flex items-center gap-3 px-4 pb-4 bg-transparent ">
          <VideoControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration || data.videoLength}
            volume={volume}
            isMuted={isMuted}
            playbackRate={playbackRate}
            onTogglePlay={togglePlay}
            onToggleMute={toggleMute}
            onVolumeChange={setVolume}
            onPlaybackRateChange={setPlaybackRate}
          />
          <ResolutionSelector hls={hls} />
          <FullscreenButton videoRef={videoRef} />
        </div>
      </div>
    </div>
  );
}
