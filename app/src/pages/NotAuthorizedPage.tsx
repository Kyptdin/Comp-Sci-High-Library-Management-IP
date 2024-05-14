import React from "react";
import { Button } from "shadcn-ui"; // Replace with actual import based on Shadcn UI documentation

export const NotAuthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-gray-950 to-teal-950 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10 max-w-md sm:max-w-md lg:max-w-md text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-teal-600 mb-4">
          403
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Not Authorized
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Failed to load page. You are either not logged in or don't have access
          to this page. Please contact the administrator if you believe this is
          an error.
        </p>
        <a
          href="/"
          className="inline-block bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-200"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};
