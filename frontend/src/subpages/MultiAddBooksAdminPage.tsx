import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { BookAddPill } from "@/components/MultiAdd/BookAddPill";
import { CsvUploadAllRow } from "@/types/csvBookInterface";
import { useValidateCSV } from "@/hooks/csv/useValidateCSV";

export const MultiAddBooksAdminPage = () => {
  const {
    csvFile,
    handleCsvInputting,
    csvFormatIsValid,
    csvUploadAllRows,
    uploadAllRows
  } = useValidateCSV();

  return (
    <div className="p-4 w-[80%] font-outfit text-white full-center flex-col justify-start">
      <h2 className="text-4xl mb-5">Bulk Add Book</h2>
      <Separator className="w-1/3 bg-gray-700" />

      <div className="flex p-4 gap-3">
        <Input
          type={"file"}
          accept={".csv"}
          onChange={handleCsvInputting}
        ></Input>
        <Button
          variant="secondary"
          onClick={uploadAllRows}
        >Upload</Button>
      </div>

      <h1 className="mb-5 text-xl  text-yellow-300">
        {csvFile ? `"${csvFile["name"]}"` : "Upload a file"}
      </h1>

      <ScrollArea className="bg-transparent h-[60vh] w-full">
        <div className="grid grid-cols-4 gap-5">
          {csvFormatIsValid &&
            csvUploadAllRows.map((csvRow: CsvUploadAllRow, index: number) => {
              return <BookAddPill csvRow={csvRow} key={index} />;
            })}
        </div>
      </ScrollArea>

      <h1 className="opacity-25 mt-5">A list of uploaded books</h1>
    </div>
  );
};
