import { useReducer } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useReportBook } from "@/hooks/report/useReportBook";
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";
import { v4 as uuidv4 } from "uuid";

type DialogState = {
  isOpen: boolean;
  reason: string;
  explanation: string;
  isError: boolean;
};

type Action =
  | { type: "OPEN_REPORT" }
  | { type: "CLOSE_REPORT" }
  | { type: "SET_REASON"; payload: string }
  | { type: "SET_EXPLANATION"; payload: string }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "RESET" };

const initialState: DialogState = {
  isOpen: false,
  reason: "",
  explanation: "",
  isError: false,
};

const reducer = (state: DialogState, action: Action): DialogState => {
  switch (action.type) {
    case "OPEN_REPORT":
      return { ...state, isOpen: true };
    case "CLOSE_REPORT":
      return initialState;
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

/**
 * Custom hook for managing the book report dialog.
 * @param {string | null | undefined} bookId - The ID of the book being reported.
 * @returns Object containing state and functions for managing the dialog.
 */
export const useBookReportDialog = (bookId: string | null | undefined) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: loggedInUserData } = useGetLoggedInUser();
  const { mutateAsync: createReport, isPending: isReportingBook } =
    useReportBook();

  const openDialog = () => {
    dispatch({ type: "OPEN_REPORT" });
  };

  const closeDialog = () => {
    dispatch({ type: "CLOSE_REPORT" });
  };

  const setReason = (newReason: string) => {
    dispatch({ type: "SET_REASON", payload: newReason });
  };

  const setExplanation = (newExplanation: string) => {
    dispatch({ type: "SET_EXPLANATION", payload: newExplanation });
  };

  const setError = (error: boolean) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const onSubmit = async () => {
    const userId = loggedInUserData?.userMetaData[0].user_id;
    if (!userId || !bookId) return;
    await createReport({
      id: uuidv4(),
      user: userId,
      explanation: state.explanation,
      reason: state.reason,
      created_at: new Date().toUTCString(),
      book_id: bookId,
    });
  };

  const handleSubmit = async () => {
    if (!state.reason || state.reason.length < 1) {
      setError(true);
      return;
    }
    await onSubmit();
    closeDialog();
  };

  const DialogComponent = (
    <Dialog
      open={state.isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog();
        } else {
          openDialog();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Book</DialogTitle>
          <DialogDescription className="pb-2">
            {/* Provide book title here */}
          </DialogDescription>

          <Select
            onValueChange={(newReason) => {
              setReason(newReason);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pick a reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="I lost the book">I lost the book</SelectItem>
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
            onChange={(e) => setExplanation(e.target.value)}
          />
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              closeDialog();
            }}
            variant="secondary"
          >
            Close
          </Button>

          <Button onClick={handleSubmit}>Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return {
    dialogState: state,
    DialogComponent,
    openDialog,
    closeDialog,
    setReason,
    setExplanation,
    setError,
    handleSubmit,
    isReportingBook,
  };
};
