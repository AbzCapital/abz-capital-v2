import { cn } from "@/lib/utils";

export interface FullLockupProps {
  className?: string;
  width?: number;
}

export function FullLockup({ className, width = 220 }: FullLockupProps) {
  return (
    <svg
      viewBox="0 0 320 110"
      width={width}
      height={(width * 110) / 320}
      role="img"
      aria-label="ABZ Capital Limited — Unlocking Opportunities, Securing Futures"
      className={cn("inline-block", className)}
    >
      {/* chevrons */}
      <path d="M6 18 L46 50 L6 82 L22 82 L62 50 L22 18 Z" fill="#ffbd59" />
      <path d="M46 18 L86 50 L46 82 L62 82 L102 50 L62 18 Z" fill="#1800ad" />
      {/* ABZ CAPITAL line */}
      <text
        x="115"
        y="55"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="34"
        fill="#1800ad"
        letterSpacing="-0.5"
      >
        ABZ CAPITAL
      </text>
      {/* LIMITED with peach underline ticks */}
      <line x1="115" y1="76" x2="143" y2="76" stroke="#ffbd59" strokeWidth="3" strokeLinecap="round" />
      <text
        x="148"
        y="82"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="18"
        fill="#1800ad"
        letterSpacing="3"
      >
        LIMITED
      </text>
      <line x1="222" y1="76" x2="250" y2="76" stroke="#ffbd59" strokeWidth="3" strokeLinecap="round" />
      {/* tagline */}
      <text
        x="115"
        y="103"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="500"
        fontSize="11"
        fill="#1800ad"
        letterSpacing="2"
      >
        UNLOCKING OPPORTUNITIES, SECURING FUTURES
      </text>
    </svg>
  );
}

export default FullLockup;
