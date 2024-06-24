import { RequestBookMutationProps } from "../server.ts";

export function validateRequestBookMutationProps(
  // deno-lint-ignore no-explicit-any
  body: any
): body is RequestBookMutationProps {
  return (
    typeof body.studentEmail === "string" &&
    typeof body.studentName === "string" &&
    typeof body.bookName === "string" &&
    typeof body.reason === "string" &&
    typeof body.explanation === "string" &&
    typeof body.requestType === "string" &&
    typeof body.userId === "string" &&
    typeof body.bookId === "string"
  );
}
