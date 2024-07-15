// Import the necessary modules from Deno's standard library
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { requestBook } from "./services/bookRequestService.ts";
import { validateRequestBookMutationProps } from "./services/validationService.ts";
import { sendBookRequestConfirmationEmail } from "./services/emailService.ts";

// Define the TypeScript interface for the request payload
export interface RequestBookMutationProps {
  studentEmail: string;
  studentName: string;
  bookName: string;
  reason: string;
  explanation: string;
  requestType: string;
  userId: string;
  bookId: string;
}

// Define the handler for incoming requests
const handler = async (request: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // Ensure the request method is POST
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Only POST requests are allowed" }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  // Parse and validate the request body
  let requestBody: RequestBookMutationProps;
  try {
    const body = await request.json();
    validateRequestBookMutationProps(body);

    if (!validateRequestBookMutationProps(body)) {
      throw new Error("Invalid payload");
    }

    requestBody = body as RequestBookMutationProps;

    // Insert a row for the book request
    await requestBook(requestBody); //Error right here

    // Send an email notification to confirm to the user that they have made a request
    await sendBookRequestConfirmationEmail(requestBody);
  } catch (error) {
    const errorObj = error as Error;

    return new Response(
      JSON.stringify({
        message: errorObj.message,
        error: errorObj,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  // Process the request and return the response as JSON
  return new Response(
    JSON.stringify({ message: "Payload is valid", data: requestBody }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

// Start the server on port 8000 and use the handler for incoming requests
serve(handler);
