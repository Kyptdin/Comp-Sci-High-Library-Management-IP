import { Borrow } from "../types/types.d.ts";

// deno-lint-ignore no-explicit-any
const isBorrow = (body: any): body is Borrow => {
  return (
    typeof body === "object" &&
    typeof body.borrow_id === "string" &&
    typeof body.damaged === "boolean" &&
    typeof body.date_borrowed === "string" &&
    typeof body.isbn === "string" &&
    typeof body.return_due_date === "string" &&
    typeof body.returned === "boolean" &&
    typeof body.user === "string"
  );
};

export const validateBorrowRequestBody = async (
  req: Request
): Promise<Borrow> => {
  const body = await req.json();
  if (!isBorrow(body)) {
    throw new Error("Invalid body format");
  }
  return body;
};
