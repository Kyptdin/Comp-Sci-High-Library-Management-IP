export interface dataInterface {
  ISBN: string;
  COPIES: number;
}

export interface ValidateBookEntry {
  Isbn: string;
  Validated: boolean;
  Title: string;
  Copies: number;
}
