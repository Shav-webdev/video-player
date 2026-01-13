/**
 * Resolution label mapping based on video height
 */
export const RESOLUTION_LABELS: Record<number, string> = {
  1080: '1080p',
  720: '720p',
  480: '480p',
  360: '360p',
  240: '240p',
};

/**
 * Get resolution label from height
 */
export function getResolutionLabel(height: number): string {
  if (height >= 1080) return RESOLUTION_LABELS[1080];
  if (height >= 720) return RESOLUTION_LABELS[720];
  if (height >= 480) return RESOLUTION_LABELS[480];
  if (height >= 360) return RESOLUTION_LABELS[360];
  if (height >= 240) return RESOLUTION_LABELS[240];
  if (height > 0) return `${height}p`;
  return 'Auto';
}

/**
 * Default quality level for "Auto" option
 */
export const AUTO_QUALITY_LEVEL = {
  index: -1,
  height: 0,
  width: 0,
  bitrate: 0,
  label: 'Auto',
} as const;
