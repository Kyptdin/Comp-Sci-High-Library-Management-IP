import { cn } from "@/lib/utils";

/**
 * Skeleton component to display a loading animation placeholder.
 * @param {string} [className] - Additional classes to apply to the skeleton.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
