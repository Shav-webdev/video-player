'use client';
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export interface UseHLSReturn {
  hls: Hls | null;
  isSupported: boolean;
  error: Error | null;
}

/**
 * Custom hook to initialize and manage HLS.js instance
 */
export function useHLS(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  src: string | null
): UseHLSReturn {
  const hlsRef = useRef<Hls | null>(null);
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!videoRef.current || !src) {
      setHlsInstance(null);
      return;
    }

    const video = videoRef.current;

    // Check if HLS.js is supported
    if (!Hls.isSupported()) {
      setError(new Error('HLS is not supported in this browser'));
      return;
    }

    // Create HLS instance
    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: false,
    });

    hlsRef.current = hls;
    setHlsInstance(hls);
    setError(null);

    // Load the source
    hls.loadSource(src);
    hls.attachMedia(video);

    // Handle HLS events
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      // Manifest loaded successfully
      setError(null);
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            setError(new Error('Network error while loading HLS stream'));
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            setError(new Error('Media error while playing HLS stream'));
            hls.recoverMediaError();
            break;
          default:
            setError(new Error('Fatal error in HLS player'));
            hls.destroy();
            setHlsInstance(null);
            break;
        }
      }
    });

    // Cleanup
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
        setHlsInstance(null);
      }
    };
  }, [videoRef, src]);

  return {
    hls: hlsInstance,
    isSupported: Hls.isSupported(),
    error,
  };
}
