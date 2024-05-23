import { Report } from "@/types/supabaseTypes";
import { supabase } from "../supabase/supabaseClient";
/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "POST ROUTES" to help you understand what this functions can be sorta understood as. To test these "routes" you can just call the function in a useEffect hook whenever the page loads.
*/
/****** POST ROUTES ******/
export const createReport = async (reportData: Report) => {
  const { data, error } = await supabase
    .from("reports")
    .insert([{ ...reportData, created_at: null }])
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/****** GET ROUTES ******/
