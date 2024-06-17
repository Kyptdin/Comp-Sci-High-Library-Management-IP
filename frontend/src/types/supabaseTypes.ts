import { Database, Tables } from "supabase/types";

/**
 * Represents user data from the "users" table.
 */
export type UserData = Tables<"users">;

/**
 * Represents borrow data from the "borrows" table.
 */
export type Borrow = Tables<"borrows">;

/**
 * Represents book data from the "books" table.
 */
export type Book = Tables<"books">;

/**
 * Represents report data from the "reports" table.
 */
export type Report = Tables<"reports">;

/**
 * Represents statistics for borrows.
 */
export interface BorrowStats {
  missing: number;
  borrowed: number;
  returned: number;
}

/**
 * Represents an update operation for the "borrows" table.
 */
export type BorrowsUpdate = Database["public"]["Tables"]["borrows"]["Update"];

/**
 * Represents an update operation for the "books" table.
 */
export type BooksUpdate = Database["public"]["Tables"]["books"]["Update"];

/**The total upvotes and downvotes a book has**/
export type BookRatings = Tables<"book_ratings">;

/**
 * Represents an update operation for the "books" table.
 */
export type BookRatingsUpdate =
  Database["public"]["Tables"]["book_ratings"]["Update"];

/**All the ratings a user has made**/
export type UserBookRatings = Tables<"user_book_ratings">;

export type UserBookRatingsUpdate =
  Database["public"]["Tables"]["user_book_ratings"]["Update"];
