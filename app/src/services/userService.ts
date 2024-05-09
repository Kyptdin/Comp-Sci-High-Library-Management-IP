import { isEmail } from "@/utils/isEmail";
import { supabase } from "../../supabase/supabaseClient";
import { User } from "@/types/supabaseTypes.js";
/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "CREATE ROUTES" to help you understand what this functions can be sorta understood as
*/
/****** POST ROUTES ******/
export const signUpUser = async (email: string, password: string) => {
  if (!isEmail(email)) {
    throw new Error("Not a valid email address");
  }
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
};

export const createUser = async (userData: User) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/****** GET ROUTES ******/
export const readAllUsersWithPagination = async () => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .range(0, 9);

  if (error) {
    throw new Error(error.message);
  }
  return users;
};

export const readUserByEmail = async (email: string) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    // Filters
    // Emails are unique per user, so only 1 user is returned
    .eq("column", email);
  if (error) {
    throw new Error(error.message);
  }
  return users;
};
