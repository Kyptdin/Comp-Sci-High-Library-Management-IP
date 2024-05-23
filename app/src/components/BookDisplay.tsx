import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { useReducer } from "react";

import { Warning } from "./Warning";
import { BookHamburger } from "./Display/BookHamburger";

import { FaBug } from "react-icons/fa";
import { useCreateReport } from "@/hooks/report/useCreateReport";
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";

interface bookData {
  children: string;
  author?: string;
  image?: string;
  isAvaliable?: boolean;
}

interface State {
  reportOpen: boolean;
  reason: string;
  explanation: string;
  isError: boolean;
}

type Action =
  | { type: "OPEN_REPORT" }
  | { type: "CLOSE_REPORT" }
  | { type: "SET_REASON"; payload: string }
  | { type: "SET_EXPLANATION"; payload: string }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "RESET" };

const initialState: State = {
  reportOpen: false,
  reason: "",
  explanation: "",
  isError: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "OPEN_REPORT":
      return { ...state, reportOpen: true };
    case "CLOSE_REPORT":
      return { ...state, reportOpen: false };
    case "SET_REASON":
      return {
        ...state,
        reason: action.payload,
        isError: action.payload.length < 1,
      };
    case "SET_EXPLANATION":
      return { ...state, explanation: action.payload };
    case "SET_ERROR":
      return { ...state, isError: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const BookDisplay = ({
  isAvaliable = true,
  author,
  image,
  children,
}: bookData) => {
  const { data: loggedInUserData } = useGetLoggedInUser();
  const { mutateAsync: createReport } = useCreateReport();
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = async () => {
    const id = loggedInUserData?.userMetaData[0]?.user_id;
    if (!id) return;
    if (!state.reason || state.reason.length < 1) {
      dispatch({ type: "SET_ERROR", payload: true });
      return;
    }
    // await createReport({});
  };

  return (
    <div
      className={cn(
        "w-[325px] h-[500px] m-4 relative",
        "bg-black overflow-clip rounded-3xl font-outfit shadow-lg shadow-gray-900",
        "flex flex-col justify-end items-center"
      )}
    >
      <img src={image} className="w-full h-full absolute fill-gray-400" />

      <div
        className={cn(
          "w-full h-full bg-gradient-to-t from-blue-950 absolute",
          image ? "to-transparent" : "to-teal-800"
        )}
      >
        {!image ? (
          <p className="text-white font-bold text-5xl text-center mt-[75px] opacity-50">
            Book cover not found
          </p>
        ) : (
          <></>
        )}
      </div>

      <div className="p-5 absolute w-full">
        <h1 className="text-2xl font-bold mt-2 text-white">{children}</h1>
        <p className="text-lg mb-3 italic text-white">By: {author}</p>

        {!isAvaliable ? (
          <Warning>NOT AVAILABLE</Warning>
        ) : (
          <Button
            className="w-full font-bold shadow-md text-md"
            variant="outline"
            onClick={() => {}}
            size="lg"
          >
            BORROW
          </Button>
        )}

        <div className="flex justify-end items-center">
          <BookHamburger>
            <DropdownMenuItem
              className="text-red-800"
              onClick={() => dispatch({ type: "OPEN_REPORT" })}
            >
              <FaBug size={20} />
              <p className="font-bold font-lg ml-1">Report</p>
            </DropdownMenuItem>
          </BookHamburger>

          <Dialog
            open={state.reportOpen}
            onOpenChange={(open) => {
              if (!open) {
                dispatch({ type: "RESET" });
              } else {
                dispatch({ type: "OPEN_REPORT" });
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Book</DialogTitle>
                <DialogDescription className="pb-2">
                  {children}
                </DialogDescription>

                <Select
                  onValueChange={(newReason) => {
                    dispatch({ type: "SET_REASON", payload: newReason });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="I lost the book">
                      I lost the book
                    </SelectItem>
                    <SelectItem value="The book is damaged">
                      The book is damaged
                    </SelectItem>
                    <SelectItem value="The book is missing">
                      The book is missing
                    </SelectItem>
                  </SelectContent>
                </Select>
                {state.isError && (
                  <p className="text-sm text-red-500 font-semibold">
                    Please include a reason
                  </p>
                )}

                <Textarea
                  placeholder="Explain here."
                  onChange={(e) =>
                    dispatch({
                      type: "SET_EXPLANATION",
                      payload: e.target.value,
                    })
                  }
                />
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={() => {
                    dispatch({ type: "RESET" });
                    dispatch({ type: "CLOSE_REPORT" });
                  }}
                  variant="secondary"
                >
                  Close
                </Button>

                <Button onClick={onSubmit}>Report</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
