import { Tables } from "../supabase/schema";

export type User = Tables<"users">;
export type Borrow = Tables<"borrows">;
