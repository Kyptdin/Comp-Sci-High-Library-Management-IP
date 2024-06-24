import { emailHtml } from "../email.ts";

interface EmailInputs {
  studentEmail: string;
  studentName: string;
  bookName: string;
  reason: string;
  explanation: string;
  requestType: string;
}

export const sendBookRequestConfirmationEmail = async ({
  studentEmail,
  bookName,
  requestType,
  studentName,
  reason,
  explanation,
}: EmailInputs) => {
  // Ensures the due date is American format "MM-DD-YYYY"
  const inputsToRemove = [
    { textToRemove: "{STUDENT NAME}", newText: studentName },
    { textToRemove: "{BOOK NAME}", newText: bookName },
    { textToRemove: "{REQUEST TYPE}", newText: requestType },
    { textToRemove: "{REASON}", newText: reason },
    { textToRemove: "{EXPLANATION}", newText: explanation },
  ];

  let finalHtmlEmaill = emailHtml;

  inputsToRemove.forEach((inputData) => {
    finalHtmlEmaill = emailHtml.replaceAll(
      inputData.textToRemove,
      inputData.newText
    );
  });

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
      subject: `Book Request Confirmation`,
      html: finalHtmlEmaill,
    }),
  });

  if (response.ok) {
    return;
  }

  throw new Error("Failed to send email.");
};
