import { isEmail } from "@/utils/isEmail";
import { supabase } from "../supabase/supabaseClient";
import { Borrow, BorrowStats, UserData } from "../types/supabaseTypes";
import { v4 as uuidv4 } from "uuid";

/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "POST ROUTES" to help you understand what this functions can be sorta understood as. To test these "routes" you can just call the function in a useEffect hook whenever the page loads.
*/
/****** POST ROUTES ******/
export const createUser = async (userData: UserData) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

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
  if (!data.user?.id) {
    throw new Error("Failed to create user");
  }
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
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
    .eq("email", email);
  if (error) {
    throw new Error(error.message);
  }
  return users;
};

export const getLoggedInUser = async () => {
  const {
    data: { user: generalUserData },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  if (!generalUserData) {
    throw new Error("Failed to get user data");
  }
  const id = uuidv4();
  const username: string = generalUserData.user_metadata.name;
  const password = null;
  const email: string = generalUserData.user_metadata.email;
  const userMetaData = await readUserByEmail(email);

  if (userMetaData.length === 0) {
    await createUser({
      user_id: id,
      user_name: username,
      password,
      admin_status: "student",
      email,
    });
  }

  return { generalUserData, userMetaData };
};

export const createStatsForBooksBorrowed = (
  borrowsArr: Borrow[]
): BorrowStats => {
  const currentDate = new Date();

  let missing = 0;
  const borrowed = borrowsArr.length;
  let returned = 0;

  for (const record of borrowsArr) {
    if (record.returned) {
      returned++;
    } else {
      const returnDueDate = new Date(record.return_due_date);
      if (currentDate > returnDueDate) {
        missing++;
      }
    }
  }

  return { missing, borrowed, returned };
};
