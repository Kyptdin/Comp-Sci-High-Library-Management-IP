import React from 'react'

import { CsvUploadAllRow } from "@/hooks/csv/useValidateCSV";

import { BookUploadStatus } from './BookUploadStatus';

interface Props {
    csvRow: CsvUploadAllRow;
}

export const BookAddPill = ({ csvRow }: Props) => {
    const rowNumber = csvRow.csvRowValidation.rowNumberInCsv;
    const isbn = csvRow.csvRowMetaData.ISBN;

    const totalCopies = csvRow.csvRowMetaData.COPIES;
    const uploadStatus = csvRow.csvRowUpload.status;
    const validationStatus = csvRow.csvRowValidation.status;

    return (
        <div className="bg-white rounded text-black font-outfit p-5 col-span-1">
            <h1 className="text-sm text-gray-400">#{rowNumber}</h1>
            <h2 className="text-2xl font-bold">
                {isbn}
                <span className="font-normal ml-3 text-gray-400">x{totalCopies}</span>
            </h2>
            <h3 className="text-lg">Lorem, ipsum dolor</h3>

            <div className="flex justify-between items-center">
                <h2 className="font-bold">
                    {validationStatus.toUpperCase()}
                </h2>
                <BookUploadStatus
                    uploadStatus={uploadStatus}
                />
            </div>
        </div>
    )
}
