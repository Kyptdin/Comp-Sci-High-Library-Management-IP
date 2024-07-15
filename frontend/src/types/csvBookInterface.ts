export interface DataInterface {
  ISBN: string;
  COPIES: string;
}

export interface CsvRowValidationError {
  message: string;
}

export interface CsvRowUploadError {
  message: string;
}

export type CsvRowValidationStatus = "valid" | "invalid" | "loading" | "idle";

export interface CsvRowValidation {
  rowNumberInCsv: number;
  status: CsvRowValidationStatus;
  validationErrors: CsvRowValidationError[];
}

export type CsvUploadStatus = "success" | "failure" | "loading" | "idle";
export interface CsvUpload {
  title: string | undefined;
  status: CsvUploadStatus;
  csvUploadErrors: CsvRowUploadError[];
}

export interface CsvUploadAllRow {
  csvRowValidation: CsvRowValidation;
  csvRowMetaData: DataInterface;
  csvRowUpload: CsvUpload;
}
