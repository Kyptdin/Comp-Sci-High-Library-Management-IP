import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";

export const BookDisplaySkeleton = ({className}: {className?: string}) => {
  return (
    <div className="p-5">
      <Skeleton
        className={cn(
          "bg-gradient-to-t from-teal-950 to-teal-900 opacity-20",
          "w-[325px] h-[500px] m-4 relative",
          "rounded-3xl relative shadow-lg shadow-gray-900",
          className
        )}
      />
    </div>
  );
};
