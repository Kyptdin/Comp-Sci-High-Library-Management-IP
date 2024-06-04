// Import the cn utility function for conditional class names
import { cn } from "@/lib/utils";

/**
 * BookDisplayImage Component
 *
 * This component displays a book cover image with a background gradient. The component uses conditional
 * styling based on the presence of additional class names passed as props.
 *
 * @param {string} [src] - The URL of the book cover image (optional).
 * @param {string} [className] - Additional class names for custom styling (optional).
 *
 * Usage:
 *
 * ```jsx
 * import { BookDisplayImage } from 'path/to/BookDisplayImage';
 *
 * const App = () => (
 *   <BookDisplayImage src="image_url.jpg" className="custom-class" />
 * );
 * ```
 *
 * This will render a book cover with the specified image and any additional styling provided through the
 * className prop.
 */
export const BookDisplayImage = ({
  src,
  className,
}: {
  src?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-[325px] h-[500px] m-4 relative",
        "bg-black overflow-clip rounded-3xl font-outfit shadow-lg shadow-gray-900",
        "flex flex-col justify-end items-center",
        className
      )}
    >
      <img src={src} className="w-full h-full absolute fill-gray-400" />

      <div className="w-full h-full bg-gradient-to-t from-blue-950 absolute"></div>
    </div>
  );
};
