import { Button } from "@/components/ui/button";

import { TbFaceIdError } from "react-icons/tb";
import { FaExclamationTriangle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// Define the Props interface for the component props
interface Props {
  returnHome?: boolean; // Optional error code
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
export const Error = ({ errorMessage, returnHome = true }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[50vh] flex justify-center items-center flex-col">
      <TbFaceIdError size={60} color="white" className="mb-3 animate-bounce"/>
      
      <p className="text-3xl text-white font-outfit">
        {errorMessage ? errorMessage : "Failed to find resource"}
      </p>

      {returnHome ? <Button 
        variant="link"
        className="text-blue-500 font-outfit" 
        onClick={() => navigate("/")}
      >
        <FaExclamationTriangle className="mr-3"/>
        Return home
      </Button> : <></>}
    </div>
  );
};
