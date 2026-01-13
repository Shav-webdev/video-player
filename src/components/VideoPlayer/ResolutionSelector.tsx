'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Hls from 'hls.js';
import { Icon } from '@/components/icon/Icon';
import { getResolutionLabel, AUTO_QUALITY_LEVEL } from '@/utils/data/resolution';

interface ResolutionSelectorProps {
  hls: Hls | null;
}

interface QualityLevel {
  index: number;
  height: number;
  width: number;
  bitrate: number;
  label: string;
}

export function ResolutionSelector({ hls }: ResolutionSelectorProps) {
  const [levels, setLevels] = useState<QualityLevel[]>([]);
  const [currentLevel, setCurrentLevel] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (!hls) return;

    const updateLevels = () => {
      const hlsLevels = hls.levels || [];
      console.log('HLS levels:', hlsLevels);
      const qualityLevels: QualityLevel[] = hlsLevels.map((level, index) => {
        const height = level.height || 0;
        const label = getResolutionLabel(height);

        return {
          index,
          height,
          width: level.width || 0,
          bitrate: level.bitrate || 0,
          label,
        };
      });

      // Add "Auto" option
      qualityLevels.unshift({
        ...AUTO_QUALITY_LEVEL,
      });

      setLevels(qualityLevels);
      setCurrentLevel(hls.currentLevel);
      console.log('Quality levels:', qualityLevels);
    };

    updateLevels();

    hls.on(Hls.Events.LEVEL_SWITCHED, () => {
      setCurrentLevel(hls.currentLevel);
    });

    hls.on(Hls.Events.LEVELS_UPDATED, updateLevels);

    return () => {
      hls.off(Hls.Events.LEVEL_SWITCHED);
      hls.off(Hls.Events.LEVELS_UPDATED);
    };
  }, [hls]);

  const handleResolutionChange = (levelIndex: number) => {
    if (!hls) return;
    hls.currentLevel = levelIndex;
    setCurrentLevel(levelIndex);
    setIsOpen(false);
  };

  // Update dropdown position when opened
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.top - 8, // Position above the button with 8px gap
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!hls || levels.length === 0) {
    return null;
  }

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex items-center z-50 justify-center w-6 h-6 hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Settings"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Icon name="20/settings" className="w-5 h-5 text-white" />
        </button>
      </div>
      {typeof window !== 'undefined' && isOpen && createPortal(
        <div
          ref={dropdownRef}
          className="fixed bg-[#1B1B1E] backdrop-blur-sm rounded-lg shadow-lg min-w-[120px] max-h-[300px] overflow-y-auto p-1 z-[100] pointer-events-auto"
          style={{
            bottom: `${window.innerHeight - dropdownPosition.top + 8}px`,
            right: `${dropdownPosition.right}px`,
          }}
        >
          {levels.map((level) => (
            <button
              key={level.index}
              onClick={(e) => {
                e.stopPropagation();
                handleResolutionChange(level.index);
              }}
              className={`w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700/50 transition-colors cursor-pointer ${
                level.index === currentLevel ? 'bg-gray-700/50' : ''
              }`}
              style={{
                padding: '8px',
              }}
            >
              {level.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}
