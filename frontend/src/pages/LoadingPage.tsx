/**
 * This component represents a loading page, typically displayed while content is being fetched or processed.
 * It shows a loading animation with three bouncing dots to indicate that the page is loading.
 *
 * @returns JSX element representing the loading page with a loading animation.
 */
export const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950 flex justify-center items-center h-screen ">
      <div className="flex space-x-2 justify-center items-center  h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-teal-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};
