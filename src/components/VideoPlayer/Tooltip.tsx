interface TooltipProps {
  title: string;
  subtitle?: string;
  leftPercent: number;
}

export function Tooltip({ title, subtitle, leftPercent }: TooltipProps) {
  return (
    <div
      className="absolute bottom-7  px-2 bg-black bg-opacity-75 w-[280px] max-h-[48px] min-h-[48px] flex flex-col gap-1 shrink justify-center text-white text-sm rounded pointer-events-none"
        style={{ left: `${leftPercent}%`, transform: 'translateX(-50%)' }}
      >
      {subtitle && (
        <div
          className="text-gray-300 py-2 text-center font-normal text-xs leading-none tracking-normal"
          style={{ fontFamily: 'var(--font-rubik), sans-serif' }}
        >
          {subtitle}
        </div>
      )}
      <div
        className="text-center pt-2 font-normal text-xs leading-none tracking-normal"
        style={{ fontFamily: 'var(--font-rubik), sans-serif' }}
      >
        {title}
      </div>
      <div className="absolute left-1/2 top-full -translate-x-1/2">
        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-black/75" />
      </div>
    </div>
  );
}
