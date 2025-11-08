import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={cn(
      "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
      className
    )}
  >
    {children}
  </div>
);

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className={cn("group/bento row-span-1", className)}>
    <div className="relative h-full rounded-xl border border-transparent p-0.5">
      <GlowingEffect
        blur={0}
        borderWidth={3}
        disabled={false}
        glow={true}
        inactiveZone={0.01}
        proximity={64}
        spread={40}
      />
      <div className="relative flex h-full flex-col justify-between space-y-4 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900 p-4 transition duration-200">
        {header}
        <div className="transition duration-200 group-hover/bento:translate-x-2">
          {icon}
          <div className="mt-2 mb-2 font-bold font-sans text-white">
            {title}
          </div>
          <div className="font-normal font-sans text-neutral-300 text-xs">
            {description}
          </div>
        </div>
      </div>
    </div>
  </div>
);
