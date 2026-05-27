import { cn } from "@/lib/utils";

export interface FullLockupProps {
  className?: string;
  width?: number;
}

export function FullLockup({ className, width = 220 }: FullLockupProps) {
  return (
    <svg
      viewBox="0 0 360 115"
      width={width}
      height={(width * 115) / 360}
      role="img"
      aria-label="ABZ Capital Limited — Unlocking Opportunities, Securing Futures"
      className={cn("inline-block", className)}
    >
      {/* chevrons */}
      <path d="M6 20 L42 52 L6 84 L20 84 L56 52 L20 20 Z" fill="#ffbd59" />
      <path d="M42 20 L78 52 L42 84 L56 84 L92 52 L56 20 Z" fill="#1800ad" />

      {/* ABZ CAPITAL text - centered */}
      <text
        x="215"
        y="58"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="36"
        fill="#1800ad"
        letterSpacing="-0.3"
      >
        ABZ CAPITAL
      </text>

      {/* LIMITED text - centered below ABZ CAPITAL */}
      <text
        x="215"
        y="85"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="20"
        fill="#1800ad"
        letterSpacing="2"
      >
        LIMITED
      </text>

      {/* tagline */}
      <text
        x="105"
        y="107"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="500"
        fontSize="10"
        fill="#1800ad"
        letterSpacing="1.5"
      >
        UNLOCKING OPPORTUNITIES, SECURING FUTURES
      </text>
    </svg>
  );
}

export default FullLockup;
