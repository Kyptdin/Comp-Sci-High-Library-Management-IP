import { Report } from "@/types/supabaseTypes";
import { supabase } from "../supabase/supabaseClient";
import { readUserByUserId } from "./userService";
import { getBookById } from "./bookService";

/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "POST ROUTES" to help you understand what this functions can be sorta understood as. To test these "routes" you can just call the function in a useEffect hook whenever the page loads.
*/
/****** POST ROUTES ******/
export const createReport = async (reportData: Report) => {
  const { data, error } = await supabase
    .from("reports")
    .insert([reportData])
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/****** GET ROUTES ******/
export const getAllReportsWithPagination = async (
  startIndex: number,
  endIndex: number
) => {
  const { data: reports, error } = await supabase
    .from("reports")
    .select("*")
    .range(startIndex, endIndex);

  if (error) {
    throw new Error(error.message);
  }

  const promiseOfUserData = reports.map((report) =>
    readUserByUserId(report.user)
  );
  const userMetaData = await Promise.all(promiseOfUserData);

  const promiseOfBookData = reports.map((report) => {
    return getBookById(report.book_id);
  });
  const bookData = await Promise.all(promiseOfBookData);

  const reportsMappedToUserAndBook = reports.map((report, index) => {
    return {
      report,
      userMetaData: userMetaData[index],
      bookData: bookData[index],
    };
  });

  return reportsMappedToUserAndBook;
};

/****** DELETE ROUTES ******/
export const deleteReportById = async (reportId: string) => {
  const { error } = await supabase.from("reports").delete().eq("id", reportId);
  if (error) {
    throw new Error(error.message);
  }
};
