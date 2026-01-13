import { memo, type SVGProps } from "react";

import { cn } from "@/utils/ui";
import type { IconName } from "@/types/name";

export const Icon = memo(function Icon({
  name,
  childClassName,
  className,
  children,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
  childClassName?: string;
}) {
  if (children) {
    return (
      <span
        className={cn(`font inline-flex items-center gap-1.5`, childClassName)}
      >
        <Icon
          name={name}
          className={cn(className, "text-typography-primary")}
          {...props}
        />
        {children}
      </span>
    );
  }
  const href = `/icons/sprite.svg#${name}`;
  return (
    <svg {...props} className={cn("h-6 w-6", className)}>
      <use
        href={href}
        xlinkHref={href as unknown as string}
        width="100%"
        height="100%"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
});

Icon.displayName = "Icon";