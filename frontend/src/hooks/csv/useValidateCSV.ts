import { useCallback, useEffect, useState } from "react";
import { useUploadCsv } from "@/hooks/csv/useUploadCSV";
import { useCreateBook } from "../book/useCreateBook";

import Papa from "papaparse";
import { fetchBookFromIsbn, isbnApiLink } from "@/utils/isbnApi";
import { convertParsedToRowData } from "@/utils/csvUtils";
import { chunk } from "@/utils/arrayUtils";

import {
  DataInterface,
  CsvUploadStatus,
  CsvUploadAllRow,
} from "@/types/csvBookInterface";
import { VolumeList } from "@/types/googleBooksAPI";

export const useValidateCSV = () => {
  const { csvFile, handleCsvInputting } = useUploadCsv();
  const [csvFormatIsValid, setCsvFormatIsValid] = useState<boolean>(false);
  const [csvUploadAllRows, setCsvUploadAllRows] = useState<CsvUploadAllRow[]>(
    []
  );

  const { mutateAsync: createBook } = useCreateBook(false);

  const chunkArraySize = 5;
  const chunkUploadTime = 10;
  const individualUploadTime = 2;

  // given a index, updates the upload status of the book
  const updateCsvUploadDataByIndex = useCallback(
    (index: number, uploadStatus: CsvUploadStatus, title?: string) => {
      const rowFromIndex = csvUploadAllRows[index];
      if (!rowFromIndex) {
        return;
      }

      const updatedCsvUploadAllRows = [...csvUploadAllRows];
      let csvRowUpload = updatedCsvUploadAllRows[index]!.csvRowUpload;
      csvRowUpload.status = uploadStatus;
      csvRowUpload.title = title;
      setCsvUploadAllRows(updatedCsvUploadAllRows);
    },
    [csvUploadAllRows]
  );

  const uploadChunkedRows = (
    csvUploadChunkedRows: CsvUploadAllRow[],
    chunkedArrayIndex: number
  ) => {
    const calculatedDelayTime = chunkedArrayIndex * chunkUploadTime * 1000;

    setTimeout(() => {
      csvUploadChunkedRows.forEach(
        (csvUploadRow: CsvUploadAllRow, index: number) => {
          const csvUploadRowIndex = chunkedArrayIndex * chunkArraySize + index;
          // no point bothering with card that doesn't exist
          if (csvUploadRow.csvRowValidation.status != "valid") {
            updateCsvUploadDataByIndex(csvUploadRowIndex, "failure");
            return;
          }

          const calculatedIndividualDelayTime =
            index * individualUploadTime * 1000;

          updateCsvUploadDataByIndex(csvUploadRowIndex, "loading");

          setTimeout(() => {
            fetchBookFromIsbn(isbnApiLink, {
              arg: csvUploadRow.csvRowMetaData.ISBN,
            })
              .then((googleData: VolumeList) => {
                const selectedBookData = googleData.items[0];
                const { title } = selectedBookData.volumeInfo;

                createBook({
                  title: title,
                  id: csvUploadRow.csvRowMetaData.ISBN,
                  total_copies_within_school: Number(
                    csvUploadRow.csvRowMetaData.COPIES
                  ),
                }).then(() => {
                  console.log(`Successfully created`);
                  updateCsvUploadDataByIndex(
                    csvUploadRowIndex,
                    "success",
                    title
                  );
                });
              })
              .catch(() => {
                console.log("Failed to create the book");
                updateCsvUploadDataByIndex(csvUploadRowIndex, "failure");
              });
          }, calculatedIndividualDelayTime);
        }
      );
    }, calculatedDelayTime);
  };

  const uploadAllRows = useCallback(() => {
    const chunkedUploadRows = chunk(csvUploadAllRows, chunkArraySize);

    chunkedUploadRows.forEach(
      (csvUploadRow: CsvUploadAllRow[], index: number) => {
        uploadChunkedRows(csvUploadRow, index);
      }
    );
  }, [csvUploadAllRows, updateCsvUploadDataByIndex]);

  /**Makes sure the user uploaded a csv that contains only the columns "CSV" and "COPIES." **/
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkIfCsvFormatValid = (books: any[]): boolean => {
    return books.every((book) => {
      // If the item is not an object or is null, it fails
      if (typeof book !== "object" || book === null) {
        return false;
      }
      const keys = Object.keys(book);
      return (
        keys.length === 2 && keys.includes("COPIES") && keys.includes("ISBN")
      );
    });
  };

  useEffect(() => {
    if (!csvFile) {
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      complete: async function (results: any) {
        const parsedCSV = results.data;

        // validate if the csv is validated
        const correctCSVFormat = checkIfCsvFormatValid(parsedCSV);
        setCsvFormatIsValid(() => correctCSVFormat);
        if (!correctCSVFormat) {
          return;
        }

        const castedDataInterface = parsedCSV as DataInterface[];
        // The validation of the rows is about to begin so status are initialized
        if (!csvUploadAllRows || csvUploadAllRows.length === 0) {
          const allRowData = convertParsedToRowData(castedDataInterface);
          setCsvUploadAllRows(allRowData);
        }
      },
    });
  }, [csvFile]);

  return {
    csvFile,
    handleCsvInputting,
    csvFormatIsValid,
    csvUploadAllRows,
    uploadAllRows,
  };
};
