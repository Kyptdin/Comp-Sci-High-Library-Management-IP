// Import the cn utility function for conditional class names
import { cn } from "@/lib/utils";

// Define the BookData interface for the component props
interface BookData {
  children: string; // The title of the book
  author?: string; // The author of the book (optional)
  image?: string; // The URL of the book cover image (optional)
}

/**
 * BookDisplay Component
 *
 * This component displays a book cover image with the book title and author. If the image is not provided,
 * it displays a placeholder text. The component uses conditional styling based on the presence of the image.
 *
 * @param {string} children - The title of the book.
 * @param {string} [author] - The author of the book (optional).
 * @param {string} [image] - The URL of the book cover image (optional).
 *
 * Usage:
 *
 * ```jsx
 * import { BookDisplay } from 'path/to/BookDisplay';
 *
 * const App = () => (
 *   <BookDisplay author="Author Name" image="image_url.jpg">
 *     Book Title
 *   </BookDisplay>
 * );
 * ```
 *
 * This will render a book cover with the specified image, title, and author. If the image is not provided,
 * it will display a placeholder text.
 */
export const BookDisplay = ({ author, image, children }: BookData) => {
  return (
    <div
      className={cn(
        "w-[250px] h-[375px] m-4 relative",
        "bg-black overflow-clip rounded-3xl font-outfit shadow-lg shadow-gray-900",
        "flex flex-col justify-end items-center"
      )}
    >
      <img src={image} className="w-full h-full absolute fill-gray-400" />

      <div
        className={cn(
          "w-full h-full bg-gradient-to-t from-blue-950 absolute",
          image ? "to-transparent" : "to-teal-800"
        )}
      >
        {!image ? (
          <p className="text-white font-bold text-3xl text-center mt-[75px] opacity-50">
            Book cover not found
          </p>
        ) : null}
      </div>

      <div className="p-5 absolute w-full">
        <h1 className="text-xl font-bold mt-2 text-white">{children}</h1>
        <p className="text-lg mb-1 italic text-white">By: {author}</p>
      </div>
    </div>
  );
};
