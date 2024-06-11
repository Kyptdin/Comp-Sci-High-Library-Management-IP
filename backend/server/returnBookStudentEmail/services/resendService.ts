import { emailHtml } from "../email.ts";

interface EmailInputs {
  studentEmail: string;
  bookName: string;
  studentName: string;
}

export const sendReturnBookStudentEmail = async ({
  studentEmail,
  bookName,
  studentName,
}: EmailInputs) => {
  const studentNameAdded = emailHtml.replaceAll(
    "{STUDENT&#x27;S NAME}",
    studentName
  );
  const finalHtml = studentNameAdded.replaceAll("{BOOK NAME}", bookName);

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
      subject: `Returned Book ${bookName}`,
      html: finalHtml,
    }),
  });

  if (response.ok) {
    return;
  }

  throw new Error("Failed to send email.");
};
