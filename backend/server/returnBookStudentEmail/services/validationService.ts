import { ReturnBookProps } from "./borrowService.ts";

// deno-lint-ignore no-explicit-any
const validateReturnBookProps = (body: any): body is ReturnBookProps => {
  return typeof body.userId === "string" && typeof body.isbn === "string";
};

export const parseAndValidateRequestBody = async (
  req: Request
): Promise<ReturnBookProps> => {
  const body = await req.json();
  if (!validateReturnBookProps(body)) {
    throw new Error("Invalid request body format");
  }
  return body as ReturnBookProps;
};
