import { supabase } from "../supabase/supabaseClient.ts";

/**
 * Retrieves a user entry from the database based on the user's ID.
 *
 * @param userId - The ID of the user.
 * @returns The user data.
 */
export const readUserByUserId = async (userId: string) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    // Filters
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return users;
};
