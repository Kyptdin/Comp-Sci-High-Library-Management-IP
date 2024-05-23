import { Tables } from "../supabase/schema";

export type UserData = Tables<"users">;
export type Borrow = Tables<"borrows">;
export type Book = Tables<"books">;
export type Report = Tables<"reports">;

export interface BorrowStats {
  missing: number;
  borrowed: number;
  returned: number;
}
