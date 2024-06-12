export interface DataInterface {
  ISBN: string;
  COPIES: string;
}

export interface ValidateBookEntry {
  isbn: string;
  title: string;
  copies: number | null;
  validatedIsbnStatus: "valid" | "invalid" | "pending";
  uploadedStatus: "success" | "failure" | "pending";
}
