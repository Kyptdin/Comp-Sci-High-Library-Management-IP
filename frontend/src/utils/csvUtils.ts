import {
    DataInterface,
    CsvRowValidation,
    CsvUpload,
    CsvUploadAllRow,
    CsvRowValidationStatus
} from "@/types/csvBookInterface";

export const convertParsedToRowData = (csvParasedRows: DataInterface[]) => {
    const csvRowsData: CsvUploadAllRow[] = csvParasedRows.map(
        (parsedRow, index) => {
            const isIsbnValid = parsedRow.ISBN.length > 0;
            const hasProperCopiesAmount = parsedRow.COPIES.length > 0;
            const validation: CsvRowValidationStatus =
                (isIsbnValid && hasProperCopiesAmount) ? "valid" : "invalid";

            const csvRowValidation: CsvRowValidation = {
                rowNumberInCsv: index + 1,
                status: validation,
                validationErrors: [],
            };
            
            const csvRowMetaData: DataInterface = {
                ISBN: parsedRow.ISBN,
                COPIES: parsedRow.COPIES,
            };

            const csvRowUpload: CsvUpload = {
                status: "idle",
                csvUploadErrors: [],
            };

            return { 
                csvRowValidation, 
                csvRowMetaData, 
                csvRowUpload 
            };
        }
    );
    return csvRowsData;
};