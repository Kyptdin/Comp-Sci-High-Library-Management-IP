import { DataInterface } from "@/types/csvBookInterface";
import { useState } from "react";

type ValidationStatus = "valid" | "invalid" | "pending";

interface ValidationError {
  rowNumberInCsv: number;
  isbn: string;
  copies: string;
  errorMessage: string;
}

export const useValidateCSV = (csvBookData: DataInterface[]) => {
  const [isValidStatus, setIsValidStatus] =
    useState<ValidationStatus>("pending");
  const [validationErros, setValidationErrors];
};
