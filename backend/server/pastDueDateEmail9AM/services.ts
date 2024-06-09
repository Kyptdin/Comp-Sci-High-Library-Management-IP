import { emailHtml } from "./emailHtml.ts";
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
  const addedStudentName = emailHtml.replaceAll(
    "{STUDENT&#x27;S NAME}",
    studentName
  );
  const addedBookName = addedStudentName.replaceAll("{BOOK NAME}", bookName);
  const finalEmailHtml = addedBookName.replaceAll("{DUE DATE}", dueDate);

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
      html: finalEmailHtml,
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
