import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookAddTablePill } from "@/components/BookAddTablePill";

import { useState } from "react";
import Papa from "papaparse";
import { ValidateBookEntry, DataInterface } from "@/types/csvBookInterface";
import { useToast } from "@/components/ui/use-toast";
import { useCsvToBook } from "@/hooks/csv/useCsvToBook";

export const MultiAddBooksAdminPage = () => {
  const [csvFile, setCsvFile] = useState(undefined);
  const [csvBookData, setCsvBookData] = useState<DataInterface[]>();
  const { booksValidated } = useCsvToBook(csvBookData);

  const { toast } = useToast();

  const handleCsvUpload = (event: any) => {
    setCsvFile(event.target.files[0]);
  };
  const uploadCsvFile = (event: any) => {
    event.preventDefault();

    if (!csvFile) return;

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const { data }: { data: DataInterface[] } = results;
        setCsvBookData(data);
      },
    });

    toast({
      title: "WARNING: Uploading books",
      description: "Don't close tab or upload new CSV",
      variant: "destructive",
    });
  };

  return (
    <div className="p-4 w-[80%] font-outfit text-white full-center flex-col justify-start">
      <h2 className="text-4xl mb-5">Bulk Add Book</h2>
      <Separator className="w-1/3 bg-gray-700" />

      <div className="flex p-4 gap-3">
        <Input type={"file"} accept={".csv"} onChange={handleCsvUpload}></Input>
        <Button variant="secondary" onClick={uploadCsvFile}>
          Confirm CSV
        </Button>
      </div>

      <h1 className="mb-5">{csvFile ? csvFile["name"] : "Upload a file"}</h1>

      <Separator className="w-1/2 bg-gray-700" />
      <Table>
        <TableHeader>
          <TableRow className="grid  grid-cols-5">
            <TableHead className="text-white  flex items-center">
              ISBN
            </TableHead>
            <TableHead className="text-white flex items-center">
              Title
            </TableHead>
            <TableHead className="text-white flex items-center">
              Copies
            </TableHead>
            <TableHead className="text-white flex items-center">
              Uploaded
            </TableHead>
            <TableHead className="text-white flex items-center justify-end">
              Valid
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <ScrollArea className="bg-transparent h-[55vh] w-full">
        <Table>
          <TableBody className="">
            {booksValidated?.map((bookData: ValidateBookEntry, key: number) => {
              return (
                <BookAddTablePill bookData={bookData} key={key} index={key} />
              );
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
