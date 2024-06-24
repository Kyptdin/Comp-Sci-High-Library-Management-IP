import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRequestBook } from "./useRequestBook";
import { useGetLoggedInUser } from "../user/useGetLoggedInUser";

interface InputError {
  inputName: string;
  message: string;
}

export const useBookRequestDialog = (bookId: string | undefined) => {
  const { mutateAsync: requestBook } = useRequestBook();
  const { data: userLoggedInUserData } = useGetLoggedInUser();

  const reasons = [
    "I want to read the book during study hall",
    "One of my classes requires the book",
    "I want to read the book during my personal time",
    "Other reason",
  ];
  const [reason, setReason] = useState<string>("");

  const requestVariants = ["Borrow", "Return"];
  const [requestType, setRequestType] = useState<string>("");

  const [explanation, setExplanation] = useState<string>("");
  const [errors, setErrors] = useState<InputError[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const requestTypeErrorMessage = errors.find(
    (error) => error.inputName === "requestType"
  )?.message;
  const reasonErrorMessage = errors.find(
    (error) => error.inputName === "reason"
  )?.message;
  const explanationErrorMessage = errors.find(
    (error) => error.inputName === "explanation"
  )?.message;

  const validateRequestType = () => {
    if (requestType.length === 0 || !requestType) {
      setErrors((errors) => [
        ...errors,
        {
          inputName: "requestType",
          message: "Please provide a type of request",
        },
      ]);
      return false;
    }
    return true;
  };
  const validateReason = () => {
    if (reason.length === 0 || !reason) {
      setErrors((errors) => [
        ...errors,
        { inputName: "reason", message: "Please provide a reason" },
      ]);
      return false;
    }
    return true;
  };
  const validateExplanation = () => {
    if (explanation.length === 0 || !explanation) {
      setErrors((errors) => [
        ...errors,
        { inputName: "explanation", message: "Please provide an explanation" },
      ]);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const isRequestTypeValid = validateRequestType();
    const isReasonValid = validateReason();
    const isExplanationValid = validateExplanation();

    if (!isReasonValid || !isExplanationValid || !isRequestTypeValid) {
      return;
    }
    const userId = userLoggedInUserData?.userMetaData[0].user_id;
    const userEmail = userLoggedInUserData?.userMetaData[0].email;
    const studentName = userLoggedInUserData?.userMetaData[0].user_name;

    if (!userId || !bookId || !userEmail || !studentName) return;

    /***
     *  studentEmail:
  studentName:
  bookName:
  reason:
  explanation: 
  requestType
  userId
  bookId
     * 
     * 
     * 
    */
    await requestBook({ studentEmail: userEmail, studentName });

    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setReason("");
    setRequestType("");
    setExplanation("");
    setErrors([]);
    setIsDialogOpen(true);
  };

  const DialogComponent = (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsDialogOpen(false);
        } else {
          setIsDialogOpen(true);
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request a Book</DialogTitle>
        </DialogHeader>

        {/* SELECT PART FOR THE TYPE OF REQUEST */}
        {requestTypeErrorMessage ? (
          <p className="text-sm text-red-500 font-semibold">
            {requestTypeErrorMessage}
          </p>
        ) : null}
        <Select
          value={requestType}
          onValueChange={(newValue) => {
            if (newValue.length > 0) {
              setErrors(
                errors.filter((error) => error.inputName !== "requestType")
              );
            }
            setRequestType(newValue);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pick a type of request" />
          </SelectTrigger>
          <SelectContent>
            {requestVariants.map((requestVariant) => {
              return (
                <SelectItem value={requestVariant}>{requestVariant}</SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* SELECT PART FOR THE REASON */}
        {reasonErrorMessage ? (
          <p className="text-sm text-red-500 font-semibold">
            {reasonErrorMessage}
          </p>
        ) : null}
        <Select
          value={reason}
          onValueChange={(newValue) => {
            if (newValue.length > 0) {
              setErrors(errors.filter((error) => error.inputName !== "reason"));
            }
            setReason(newValue);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pick a reason" />
          </SelectTrigger>
          <SelectContent>
            {reasons.map((reason) => {
              return <SelectItem value={reason}>{reason}</SelectItem>;
            })}
          </SelectContent>
        </Select>

        {/* Text box */}
        {explanationErrorMessage ? (
          <p className="text-sm text-red-500 font-semibold">
            {explanationErrorMessage}
          </p>
        ) : null}
        <Textarea
          placeholder="Provide an explanation"
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setErrors(
                errors.filter((error) => error.inputName !== "explanation")
              );
            }
            setExplanation(e.target.value);
          }}
          value={explanation}
        />

        <DialogFooter>
          <Button
            onClick={() => {
              setIsDialogOpen(false);
            }}
            variant="secondary"
          >
            Close
          </Button>

          <Button onClick={handleSubmit}>Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return { DialogComponent, handleOpenDialog };
};
