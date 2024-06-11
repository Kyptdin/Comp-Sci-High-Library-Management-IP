import { serve } from "https://deno.land/std@0.160.0/http/server.ts";
import { parseAndValidateRequestBody } from "./services/validationService.ts";
import { returnBorrowedBook } from "./services/borrowService.ts";
import { readUserByUserId } from "./services/userService.ts";
import { getBookById } from "./services/bookService.ts";
import { sendReturnBookStudentEmail } from "./services/resendService.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    // Handle preflight requests and fix CORS issues
    return new Response(null, {
      status: 200,
      headers: new Headers(corsHeaders),
    });
  } else if (req.method === "POST") {
    try {
      const requestBody = await parseAndValidateRequestBody(req);

      // Return the book
      await returnBorrowedBook(requestBody);

      // Get the user's metadata in order to get the user's name and email
      const userMetaDataList = await readUserByUserId(requestBody.userId);
      const { email: studentEmail, user_name: studentName } =
        userMetaDataList[0];

      // Get the book's metadata
      const bookMetaDataList = await getBookById(requestBody.isbn);
      const { title: bookName } = bookMetaDataList[0];

      // Send an email notifiying the user that they have returned the book
      await sendReturnBookStudentEmail({ studentEmail, studentName, bookName });

      return new Response("Return book inputs received successfully", {
        status: 200,
        headers: new Headers({
          ...corsHeaders,
          "Content-Type": "application/json",
        }),
      });
    } catch (error) {
      return new Response(`Error: ${error.message}`, {
        status: 400,
        headers: new Headers({
          ...corsHeaders,
          "Content-Type": "application/json",
        }),
      });
    }
  } else {
    return new Response("Only POST requests are supported", {
      status: 405,
      headers: new Headers({
        ...corsHeaders,
        "Content-Type": "application/json",
      }),
    });
  }
};

serve(handler);
