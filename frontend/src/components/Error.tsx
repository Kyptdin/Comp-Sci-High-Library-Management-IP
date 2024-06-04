// Import the TbError404 icon from the react-icons/tb library
import { TbError404 } from "react-icons/tb";

// Define the Props interface for the component props
interface Props {
  errorCode?: number; // Optional error code
  errorMessage?: string; // Optional error message
}

/**
 * Error Component
 *
 * This component displays an error message with an optional error code. If no error message is provided,
 * it displays a default message indicating a failed resource.
 *
 * @param {number} [errorCode] - The error code (optional).
 * @param {string} [errorMessage] - The error message (optional).
 *
 * Usage:
 *
 * ```jsx
 * import { Error } from 'path/to/Error';
 *
 * const App = () => (
 *   <Error errorMessage="Failed to load data" />
 * );
 * ```
 *
 * This will render an error message with the specified error message. If no error message is provided,
 * it will display a default message indicating a failed resource.
 */
export const Error = ({ errorMessage }: Props) => {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center flex-col">
      <TbError404 size={50} color="white" className="my-5" />
      <p className="text-3xl text-white font-outfit">
        {errorMessage ? errorMessage : "Failed to find resource"}
      </p>
    </div>
  );
};
