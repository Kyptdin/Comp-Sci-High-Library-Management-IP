import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { useMassCreateBooks } from "@/hooks/book/useMassCreateBooks";

interface dataInterface {
  ISBN: string;
}
[];

export const MultiAddBooksAdminPage = () => {
  const [csvFile, setCsvFile] = useState(undefined);
  const [csvBookData, setCsvBookData] = useState<dataInterface>();

  const handleCsvUpload = (event: any) => {
    setCsvFile(event.target.files[0]);
  };
  const uploadCsvUpload = (event: any) => {
    event.preventDefault();

    if (!csvFile) return;

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const { data }: { data: dataInterface } = results;
        setCsvBookData(data);
      },
    });
  };

  return (
    <div className="p-4 w-[80%] font-outfit text-white full-center flex-col justify-start">
      <h2 className="text-4xl mb-5">Bulk Add Book</h2>
      <Separator className="w-1/3 bg-gray-700" />

      <div className="flex p-4 gap-3">
        <Input type={"file"} accept={".csv"} onChange={handleCsvUpload}></Input>
        <Button variant="secondary" onClick={uploadCsvUpload}>
          Confirm CSV
        </Button>
      </div>
      <h1 className="mb-5">{csvFile ? csvFile?.name : "Upload a file"}</h1>

      <Separator className="w-1/2 bg-gray-700" />

      <div className="p-4 flex flex-col">
        {csvBookData?.map((bookData: dataInterface, key: number) => {
          return <h1 key={key}>{bookData.ISBN}</h1>;
        })}
      </div>
    </div>
  );
};
