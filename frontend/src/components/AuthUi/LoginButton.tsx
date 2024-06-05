// Import the Google icon from react-icons/bs
import { BsGoogle } from "react-icons/bs";

// Import the custom Button component
import { Button } from "@/components/ui/button";

// Import the loginWithGoogle function from the auth services
import { loginWithGoogle } from "../../services/auth";

/**
 * LoginButton Component
 *
 * This component renders a button that allows users to log in using their Google account.
 * It leverages the react-icons library for the Google icon, a custom Button component for styling,
 * and a loginWithGoogle function to handle the authentication process.
 *
 * Usage:
 *
 * To use the LoginButton component, simply import and include it in your JSX code:
 *
 * ```jsx
 * import { LoginButton } from 'path/to/LoginButton';
 *
 * const App = () => (
 *   <div>
 *     <LoginButton />
 *   </div>
 * );
 * ```
 *
 * This will render a button that users can click to log in with their Google account.
 */
export const LoginButton = () => {
  return (
    <Button
      variant="secondary" // Sets the button variant to secondary
      className="rounded-full" // Adds Tailwind CSS classes to make the button fully rounded
      onClick={() => loginWithGoogle()} // Sets the button's onClick event to trigger the loginWithGoogle function
    >
      <BsGoogle size={20} className="mr-3" />
      LOGIN WITH GOOGLE
    </Button>
  );
};
