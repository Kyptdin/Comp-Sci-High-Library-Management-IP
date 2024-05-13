import { getLoggedInUser } from "@/services/userService";
import { AuthError, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useGetLoggedInUser = () => {
  const [data, setData] = useState<User>();
  const [error, setError] = useState<AuthError>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    async function getSomeData() {
      try {
        setIsLoading(true);
        const loggedInData = await getLoggedInUser();
        setIsLoading(false);
        setData(loggedInData);
      } catch (error) {
        const errorObj = error as AuthError;
        setError(errorObj);
      }
    }
    getSomeData();
  }, []);

  return { data, error, isLoading };
};
