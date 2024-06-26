import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

/**
 * This component represents a page displayed when a user is not authorized to access a certain page or resource.
 * It displays a 403 error message with an option to go back to the home page.
 *
 * @returns JSX element representing the not authorized page.
 */

export const NotAuthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-gray-950 to-teal-950 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md sm:max-w-md  text-center">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl font-bold text-teal-600">
            403
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Not Authorized
          </CardDescription>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            Access Denied. You're not logged in or you lack permission for this
            page. Please contact the administrator if you believe this is an
            error.
          </p>
          <Link to="/">
            <Button className="inline-block bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-200">
              Go to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
