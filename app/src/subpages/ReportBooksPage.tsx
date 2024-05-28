import { Separator } from "@/components/ui/separator";
import { ReportPill } from "@/components/ReportPill";

import { useGetAllReportsWithPagination } from "@/hooks/report/useGetAllReportsWithPagination";

export const ReportBooksPage = () => {
  const { data: reportQueries } = useGetAllReportsWithPagination(0, 3);
  console.log(reportQueries);

  return (
    <div className="text-white w-[80%] p-4">
      <div className="p-4">
        <h1 className="text-4xl">Reports</h1>
        <Separator className="w-full bg-gray-500 my-5" />
      </div>

      <div className="px-4 pb-4 grid grid-cols-2">
        {reportQueries?.map((reportData, key: number) => {
            return <ReportPill 
                key={key}
                reason={reportData.report.reason}
                explanation={reportData.report.explanation}
                email={reportData.userMetaData[0].email}
                bookTitle={"hello"}
            />
        })}
      </div>
    </div>
  );
};
