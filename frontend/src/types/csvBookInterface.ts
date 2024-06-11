export interface DataInterface {
  ISBN: string;
  COPIES: number;
}

export interface ValidateBookEntry {
  Isbn: string;
  Title: string;
  Copies: number;
  Validated: boolean;
  UploadedStatus: "pending" | "success" | "failure";
}
