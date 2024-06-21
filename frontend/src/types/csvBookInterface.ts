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
  // TODO: Make sure to store the google api later in this object to avoid doing another api request to the google books api
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