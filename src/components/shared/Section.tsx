import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "xl";
  background?: "white" | "mesh" | "mesh-soft" | "indigo" | "ink";
}

const spacingMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-24",
  xl: "py-24 sm:py-32",
};

const bgMap: Record<NonNullable<SectionProps["background"]>, string> = {
  white: "bg-background",
  mesh: "bg-mesh",
  "mesh-soft": "bg-mesh-soft",
  indigo: "bg-indigo text-white",
  ink: "bg-ink text-white",
};

export function Section({
  spacing = "lg",
  background = "white",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        spacingMap[spacing],
        bgMap[background],
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

export default Section;
