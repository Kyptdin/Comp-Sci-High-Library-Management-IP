
import { CsvUploadAllRow } from "@/types/csvBookInterface";

import { cn } from "@/lib/utils";
import { BookUploadStatus } from './BookUploadStatus';
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
    csvRow: CsvUploadAllRow;
}

export const BookAddPill = ({ csvRow }: Props) => {
    const rowNumber = csvRow.csvRowValidation.rowNumberInCsv;
    const isbn = csvRow.csvRowMetaData.ISBN;
    const title = csvRow.csvRowUpload.title;

    const totalCopies = csvRow.csvRowMetaData.COPIES;
    const uploadStatus = csvRow.csvRowUpload.status;
    const validationStatus = csvRow.csvRowValidation.status;

    return (
        <div className={cn(
            "bg-white rounded text-black font-outfit p-5 col-span-1",
            validationStatus != "valid" ? "opacity-50" : "opacity-100"
        )}>
            <h1 className="text-sm text-gray-400">#{rowNumber}</h1>
            <h2 className="text-2xl font-bold">
                {isbn}
                <span className="font-normal ml-3 text-gray-400">x{totalCopies}</span>
            </h2>

            {
                !title ? 
                    <Skeleton className="w-1/2 h-[12px] my-2 rounded bg-black opacity-10" /> : 
                    <h3 className="text-lg">{title}</h3>
            }

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
