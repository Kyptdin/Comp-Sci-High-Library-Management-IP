import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MultiAddTableHead } from "@/components/MultiAdd/MultiAddTableHead";
import { useValidateCSV } from "@/hooks/csv/useValidateCSV";
import { BookAddTablePill } from "@/components/MultiAdd/BookAddTablePill";

export const MultiAddBooksAdminPage = () => {
  const {
    handleCsvInputting,
    validateCSV,
    csvFile,
    allRowsAreValid,
    csvUploadAllRows,
    csvFormatIsValid,
  } = useValidateCSV();

  console.log(csvUploadAllRows);

  // const { booksValidated } = useCsvToBook(csvBookData);
  // const { toast } = useToast();
  // const handleCsvInputting = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (!files) return;
  //   const fileInputted = files[0];
  //   setCsvFile(fileInputted);
  // };

  // const uploadCsvFile = (event: any) => {
  //   event.preventDefault();

  //   if (!csvFile) return;

  //   Papa.parse(csvFile, {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: function (results: any) {
  //       const { data }: { data: DataInterface[] } = results;
  //       console.log(data);
  //       setCsvBookData(data);
  //     },
  //   });

  //   toast({
  //     title: "WARNING: Uploading books",
  //     description: "Don't close tab or upload new CSV",
  //     variant: "destructive",
  //   });
  // };

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
          onClick={
            allRowsAreValid ? () => alert("Upload function") : validateCSV
          }
        >
          {allRowsAreValid ? "Upload" : "Validate CSV"}
        </Button>
      </div>

      <h1 className="mb-5">{csvFile ? csvFile["name"] : "Upload a file"}</h1>

      <Separator className="w-1/2 bg-gray-700" />
      <Table>
        <TableHeader>
          <TableRow className="grid grid-cols-6">
            <MultiAddTableHead
              headName="Row  #"
              toolTipText="The row number within the csv that was uploaded."
            />
            <MultiAddTableHead
              headName="ISBN"
              toolTipText="The ISBN-10 of the book which is located at the back of the book."
            />
            <MultiAddTableHead
              headName="Title"
              toolTipText="The title of the book which appears after the book has been validated."
            />
            <MultiAddTableHead
              headName="Total Copies"
              toolTipText="The total amount of copies that exist of this book within the school."
            />
            <MultiAddTableHead
              headName="Uploaded"
              toolTipText="Displays the status of the book being uploaded to the school database."
            />
            <MultiAddTableHead
              headName="Valid CSV Row"
              toolTipText="If the row doesn't have an isbn, copies amount, or the isbn already exist in the school database, then the row is invalid."
              headClasses="justify-end"
              toolTipClasses="w-36"
            />
          </TableRow>
        </TableHeader>
      </Table>

      <ScrollArea className="bg-transparent h-[55vh] w-full">
        <Table>
          <TableBody>
            {csvFormatIsValid &&
              csvUploadAllRows.map((csvRow, index) => {
                return <BookAddTablePill 
                  csvRow={csvRow} 
                  key={index} 
                />;
              })}
          </TableBody>
        </Table>
      </ScrollArea>

      <Table>
        <TableCaption>A list of uploaded books.</TableCaption>
      </Table>
    </div>
  );
};
