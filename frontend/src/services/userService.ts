import { isEmail } from "@/utils/isEmail";
import { supabase } from "../../supabase/supabaseClient";
import { Borrow, BorrowStats, UserData } from "../types/supabaseTypes";
import { v4 as uuidv4 } from "uuid";

/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "POST ROUTES" to help you understand what this functions can be sorta understood as. To test these "routes" you can just call the function in a useEffect hook whenever the page loads.
*/
/****** POST ROUTES ******/
/**
 * Creates a new user entry in the database.
 *
 * @param userData - The data of the user to be created.
 * @returns The newly created user data.
 */
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

/**
 * Signs up a new user using email and password.
 *
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns The signed up user data.
 */
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

/**
 * Logs in a user using email and password.
 *
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns The logged in user data.
 */
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
/**
 * Retrieves all user entries from the database with pagination.
 *
 * @returns An array of user data.
 */
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

/**
 * Retrieves a user entry from the database based on the user's email.
 *
 * @param email - The email of the user.
 * @returns The user data.
 */
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

/**Search user by a similar name using a search engine **/
export const searchUserBySimilarUsername = async (userName: string) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .ilike("user_name", `%${userName}%`);

  if (error) {
    throw new Error(error.message);
  }

  return users;
};

/**
 * Retrieves the currently logged in user.
 *
 * @returns The general user data and user metadata.
 */
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

/**
 * Creates statistics for books borrowed based on the provided borrow array.
 *
 * @param borrowsArr - The array of borrow data.
 * @returns The statistics for books borrowed.
 */
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
