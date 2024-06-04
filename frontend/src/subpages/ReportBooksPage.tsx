import { Separator } from "@/components/ui/separator";
import { ReportPill } from "@/components/ReportPill";
import { useGetAllReportsWithPagination } from "@/hooks/report/useGetAllReportsWithPagination";

/**
 * This component displays a list of reports, each represented by a `ReportPill` component.
 * It fetches the reports using the `useGetAllReportsWithPagination` hook and displays them in a grid layout.
 */
export const ReportBooksPage = () => {
  // Fetches the reports with pagination (first page, 3 reports per page)
  const { data: reportQueries } = useGetAllReportsWithPagination(0, 3);

  return (
    <div className="text-white w-[80%] p-4">
      <div className="p-4">
        <h1 className="text-4xl">Reports</h1>
        {/* Horizontal separator */}
        <Separator className="w-full bg-gray-500 my-5" />
      </div>

      <div className="px-4 pb-4 grid grid-cols-2">
        {/* Maps over the reportQueries to render each report */}
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
