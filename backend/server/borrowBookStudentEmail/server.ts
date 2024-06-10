import { serve } from "https://deno.land/std@0.160.0/http/server.ts";
import { borrowBook } from "./services/bookService.ts";
import { readUserByUserId } from "./services/userService.ts";
import { getBookById } from "./services/bookService.ts";
import { sendBorrowedBookStudentEmail } from "./services/resendService.ts";
import { validateBorrowRequestBody } from "./services/validator.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    // Handle preflight requests and fixes CORS issues
    return new Response(null, {
      status: 200,
      headers: new Headers(corsHeaders),
    });
  } else if (req.method === "POST") {
    try {
      // Ensure the body is valid
      const body = await validateBorrowRequestBody(req);

      console.log(body);

      // Borrow the book
      await borrowBook(body);

      // Get the user meta data such as the person's username and email
      const userMetaData = await readUserByUserId(body.user);

      // Get the book meta data to get the book title
      const bookMetaData = await getBookById(body.isbn);

      // Use the metadata to send the user an email
      await sendBorrowedBookStudentEmail({
        studentEmail: userMetaData[0].email,
        bookName: bookMetaData[0].title,
        dueDate: body.return_due_date,
        studentName: userMetaData[0].user_name,
      });

      return new Response("Borrow inputs received successfully", {
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
