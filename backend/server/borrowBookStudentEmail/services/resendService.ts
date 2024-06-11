import { emailHtml } from "../emailHtml.ts";

interface EmailInputs {
  studentEmail: string;
  studentName: string;
  bookName: string;
  dueDate: string;
}

export const sendBorrowedBookStudentEmail = async ({
  studentEmail,
  bookName,
  dueDate,
  studentName,
}: EmailInputs) => {
  // Ensures the due date is American format "MM-DD-YYYY"
  const dueDateAmerican = new Date(dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const bookNameAdded = emailHtml.replaceAll("{BOOK NAME}", bookName);
  const dueDateAdded = bookNameAdded.replaceAll("{DUE DATE}", dueDateAmerican);
  const finalEmailHtml = dueDateAdded.replaceAll(
    "{STUDENT&#x27;S NAME}",
    studentName
  );

  const RESEND_API_KEY = "re_fC2bHA2D_Fnxw9HMKW2LhNJxcr8FBSW2Z";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "isaac@isaacstar.com",
      to: studentEmail,
      subject: `Borrowed Book ${bookName}`,
      html: finalEmailHtml,
    }),
  });

  if (response.ok) {
    return;
  }

  throw new Error("Failed to send email.");
};
