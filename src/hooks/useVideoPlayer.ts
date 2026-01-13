import { useState, useRef, useCallback, useEffect } from 'react';
import { useHLS } from './useHLS';

export interface UseVideoPlayerReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  hls: ReturnType<typeof useHLS>['hls'];
  error: Error | null;
}

/**
 * Custom hook to manage video player state and controls
 */
export function useVideoPlayer(
  src: string | null,
  videoLength: number
): UseVideoPlayerReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(videoLength || 0);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRateState] = useState(1);

  const { hls, error } = useHLS(videoRef, src);

  // Update current time
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  // Update duration when metadata loads
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || videoLength);
    }
  }, [videoLength]);

  // Handle play/pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Seek to specific time
  const seek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(time, duration));
    }
  }, [duration]);

  // Set volume
  const setVolume = useCallback((newVolume: number) => {
    if (videoRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      videoRef.current.volume = clampedVolume;
      setVolumeState(clampedVolume);
      if (clampedVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  }, [isMuted]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // Set playback rate
  const setPlaybackRate = useCallback((rate: number) => {
    if (videoRef.current) {
      const clampedRate = Math.max(0.25, Math.min(2, rate));
      videoRef.current.playbackRate = clampedRate;
      setPlaybackRateState(clampedRate);
    }
  }, []);

  // Attach event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, [handleTimeUpdate, handleLoadedMetadata]);

  return {
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
  };
}
