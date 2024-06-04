// Import necessary components and utilities
import { GiTerror } from "react-icons/gi";
import { cn } from "@/lib/utils";

/**
 * Warning Component
 *
 * This component displays a warning message with an icon.
 *
 * @param {string} children - The warning message content.
 * @param {string} [className] - The className for styling (optional).
 *
 * Usage:
 *
 * ```jsx
 * import { Warning } from 'path/to/Warning';
 *
 * const App = () => (
 *   <Warning className="custom-class">This is a warning message</Warning>
 * );
 * ```
 *
 * This will render a warning message with the specified content and className.
 */
export const Warning = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-red-900 px-3 py-[8px] rounded shadow-md shadow-red-950",
        "flex justify-center items-center",
        className
      )}
    >
      <div className="mr-2">
        <GiTerror color="white" size={30} />
      </div>
      <p className="text-white font-bold">{children}</p>
    </div>
  );
};
