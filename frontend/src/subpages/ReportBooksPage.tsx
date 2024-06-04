import { Separator } from "@/components/ui/separator";
import { ReportPill } from "@/components/ReportPill";

import { useGetAllReportsWithPagination } from "@/hooks/report/useGetAllReportsWithPagination";

export const ReportBooksPage = () => {
  const { data: reportQueries } = useGetAllReportsWithPagination(0, 3);

  return (
    <div className="text-white w-[80%] p-4">
      <div className="p-4">
        <h1 className="text-4xl">Reports</h1>
        <Separator className="w-full bg-gray-500 my-5" />
      </div>

      <div className="px-4 pb-4 grid grid-cols-2">
        {reportQueries?.map((report, key: number) => {
          return (
            <ReportPill
              key={key}
              reason={report.report.reason}
              explanation={report.report.explanation}
              email={report.userMetaData[0].email}
              bookTitle={report.bookData[0].title}
              reportId={report.report.id}
            />
          );
        })}
      </div>
    </div>
  );
};
