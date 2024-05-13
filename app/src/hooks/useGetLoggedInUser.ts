import { getLoggedInUser } from "@/services/userService";
import { AuthError, User } from "@supabase/supabase-js";
import { useEffect, useReducer } from "react";

interface State {
  data?: User;
  error?: AuthError;
  isLoading?: boolean;
}

type Action =
  | { type: "FETCH_LOADING" }
  | { type: "FETCH_SUCCESS"; payload: User }
  | { type: "FETCH_ERROR"; payload: AuthError }
  | { type: "RESET_STATE" };

const initialState: State = {
  data: undefined,
  error: undefined,
  isLoading: undefined,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_LOADING":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export const useGetLoggedInUser = (): {
  data?: User;
  error?: AuthError;
  isLoading?: boolean;
  resetState: () => void;
} => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "FETCH_LOADING" });
        const loggedInData = await getLoggedInUser();
        dispatch({ type: "FETCH_SUCCESS", payload: loggedInData });
      } catch (error) {
        const errorObj = error as AuthError;
        dispatch({ type: "FETCH_ERROR", payload: errorObj });
      }
    }
    fetchData();
  }, []);

  const resetState = () => {
    dispatch({ type: "RESET_STATE" });
  };

  return { ...state, resetState };
};
