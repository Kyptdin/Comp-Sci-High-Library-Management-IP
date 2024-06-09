// deployctl deploy --prod --project=funny-bat-63 server.ts
import {
  getAllBookMetaDataFromBorrows,
  getAllMissingBooks,
  getAllUserMetaDataFromBorrows,
  sendEmailToStudentMissingBook,
} from "./services.ts";

/**
 * Retrieves a list of all users who have overdue books and sends them a notification email.
 * @returns {Promise<Response>} A promise that resolves with a response indicating success or failure.
 */
const handler = async (): Promise<Response> => {
  // Step #1: Get a list of all the user who currenlty have books past their due date which have not been returned
  const allMissingBooks = await getAllMissingBooks();

  // Step #2: Get all the user metadata which is used to get the user's name
  const studentMetaData = await getAllUserMetaDataFromBorrows(allMissingBooks);

  // Step #3 Get all the book data which is used ot display the book the user borrowed
  const bookMetaData = await getAllBookMetaDataFromBorrows(allMissingBooks);

  // Step #4: Send emails to about the book they are missing
  await sendEmailToStudentMissingBook(
    allMissingBooks,
    studentMetaData,
    bookMetaData
  );

  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Cron job that runs every 9 am
Deno.cron("sample cron", "0 13 * * *", () => {
  handler();
});
