import { cn } from "@/lib/utils";

export interface ChevronMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function ChevronMark({ size = 36, className, ...rest }: ChevronMarkProps) {
  return (
    <svg
      viewBox="0 0 100 60"
      width={size}
      height={size * 0.6}
      role="img"
      aria-label="ABZ Capital"
      className={cn("inline-block shrink-0", className)}
      {...rest}
    >
      <path d="M5 8 L38 30 L5 52 L18 52 L51 30 L18 8 Z" fill="#ffbd59" />
      <path d="M38 8 L71 30 L38 52 L51 52 L84 30 L51 8 Z" fill="#1800ad" />
    </svg>
  );
}

export default ChevronMark;
