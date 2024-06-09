import { supabase } from "./supabaseClient.ts";
import { Book } from "./types.d.ts";
import { Borrow } from "./types.d.ts";
import { UserData } from "./types.d.ts";

/**
 * Retrieves metadata about a specific user from the database.
 * @param {string} userId The ID of the user.
 * @returns A promise that resolves to the user's data.
 */
export const getStudentMetaDataById = async (userId: string) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    // Filters
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return users;
};

/**
 * Retrieves data about a specific book from the database.
 * @param {string} bookId The ID of the book.
 * @returns  A promise that resolves to the book's data.
 */
export const getBookDataById = async (bookId: string) => {
  const { data: bookData, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch book data: ${error.message}`);
  }

  return bookData;
};

/**
 * Sends an email notification about a missing book to a user.
 * @param {string} studentName The name of the student.
 * @param {string} studentEmail The email address of the student.
 * @param {string} bookName The name of the missing book.
 * @param {string} dueDate The due date of the book.
 * @returns {Promise<void | Response>} A promise that resolves when the email is sent.
 */
export const sendMissingBookEmail = async (
  studentName: string,
  studentEmail: string,
  bookName: string,
  dueDate: string
): Promise<void | Response> => {
  const newHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Missing Book ${bookName} <div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>
  <body style="background-color:rgb(255,255,255);font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-left:auto;margin-right:auto;padding:1.5rem;padding-bottom:3rem;background-repeat:no-repeat;background-position:bottom">
      <tbody>
        <tr style="width:100%">
          <td>
            <div style="display:flex;justify-content:center"><img alt="Comp Sci High Library Logo" src="https://vygjxzhtqazwuskkaxpz.supabase.co/storage/v1/object/public/logos/black.png" style="display:block;outline:none;border:none;text-decoration:none;height:1.25rem" /></div>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:1.5rem;margin-bottom:1.5rem">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:1rem;line-height:1.75rem;margin:16px 0;margin-top:1rem">Dear <!-- -->${studentName}<!-- -->,</p>
                    <p style="font-size:1rem;line-height:1.75rem;margin:16px 0">We are writing to inform you that the book &quot;<!-- -->${bookName}<!-- -->&quot; was due on <!-- -->${dueDate}<!-- -->, and has not yet been returned. Please return the book as soon as possible.</p>
                    <p style="font-size:1rem;line-height:1.75rem;margin:16px 0;margin-top:1rem">If you have lost &quot;<!-- -->${bookName}<!-- -->,&quot; please contact your English teacher for further instructions.</p><a href="google.com" class="hover:bg-gray-800" style="color:rgb(255,255,255);text-decoration:none;background-color:rgb(0,0,0);font-weight:700;padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1rem;padding-right:1rem;border-radius:0.25rem;margin-top:2rem;display:block;text-align:center" target="_blank">Return book</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:1rem;line-height:1.75rem;margin:16px 0;margin-top:1rem">Best Regards,<br />CSH Library Team</p>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-top-width:1px;border-color:rgb(209,213,219);margin-top:3rem" />
            <p style="font-size:0.75rem;line-height:1rem;margin:16px 0;color:rgb(75,85,99);margin-left:0.25rem">Urban Assembly Charter School for Computer Science</p>
            <p style="font-size:0.75rem;line-height:1rem;margin:16px 0;color:rgb(75,85,99);margin-left:0.25rem">1300 Boynton Ave, Bronx, NY 10472</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;

  const RESEND_API_KEY = "re_fC2bHA2D_Fnxw9HMKW2LhNJxcr8FBSW2Z";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "isaac@isaacstar.com",
      to: studentEmail,
      subject: `Missing Book ${bookName}`,
      html: newHtml,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    // Handle the case where the fetch request isn't successful
    throw new Error("Failed to send email");
  }
};

export const getAllMissingBooks = async () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const { data: allMissingBooks, error } = await supabase
    .from("borrows")
    .select("*")
    .eq("returned", false)
    .lte("return_due_date", currentDate);

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
  return allMissingBooks;
};

export const getAllUserMetaDataFromBorrows = async (borrowsList: Borrow[]) => {
  const promiseArrGettingStudentMetaData = borrowsList.map((borrow) => {
    return getStudentMetaDataById(borrow.user);
  });
  const studentMetaData = await Promise.all(promiseArrGettingStudentMetaData);
  const studentMetaDataFlatted = studentMetaData.flat();
  return studentMetaDataFlatted;
};

export const getAllBookMetaDataFromBorrows = async (borrowsList: Borrow[]) => {
  const promiseArrGettingBookData = borrowsList.map((borrow) => {
    return getBookDataById(borrow.isbn);
  });
  const bookData = await Promise.all(promiseArrGettingBookData);
  return bookData;
};

export const sendEmailToStudentMissingBook = async (
  allMissingBooks: Borrow[],
  studentMetaData: UserData[],
  bookMetaData: Book[]
) => {
  const promiseArrEmails = allMissingBooks.map((borrow, index) => {
    const studentEmail = studentMetaData[index].email;
    const studentName = studentMetaData[index].user_name;
    const bookName = bookMetaData[index].title;
    const dueDateNormalPerson = borrow.return_due_date;
    const dueDateAmerican = new Date(dueDateNormalPerson).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    return sendMissingBookEmail(
      studentName,
      studentEmail,
      bookName,
      dueDateAmerican
    );
  });
  await Promise.all(promiseArrEmails);
};
