// Import the cn utility function for conditional class names
import { cn } from "@/lib/utils";

// Import the Skeleton component for loading state
import { Skeleton } from "@/components/ui/skeleton";

/**
 * BookDisplaySkeleton Component
 *
 * This component displays a skeleton placeholder for a book cover. It is used as a loading indicator
 * while the actual book cover image is being loaded.
 *
 * @param {string} [className] - Additional class names for custom styling (optional).
 *
 * Usage:
 *
 * ```jsx
 * import { BookDisplaySkeleton } from 'path/to/BookDisplaySkeleton';
 *
 * const App = () => (
 *   <BookDisplaySkeleton className="custom-class" />
 * );
 * ```
 *
 * This will render a skeleton placeholder with the specified additional styling provided through the
 * className prop.
 */
export const BookDisplaySkeleton = ({ className }: { className?: string }) => {
  return (
    <div className="p-5">
      <Skeleton
        className={cn(
          "bg-gradient-to-t from-teal-950 to-teal-900 opacity-20", // Gradient background for the skeleton
          "w-[325px] h-[500px] m-4 relative", // Dimensions and positioning
          "rounded-3xl relative shadow-lg shadow-gray-900", // Rounded corners and shadow
          className // Additional custom class names
        )}
      />
    </div>
  );
};
