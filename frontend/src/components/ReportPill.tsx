// Import necessary components and hooks
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { RxCross2 } from "react-icons/rx";
import { useDeleteReportById } from "@/hooks/report/useDeleteReportById";

// Define the interface for the report parameters
interface ReportBookParams {
  email: string;
  reason: string;
  bookTitle: string;
  explanation?: string;
  reportId: string;
}

/**
 * ReportPill Component
 *
 * This component represents a report pill displaying information about a reported book. It allows
 * the user to view an explanation for the report and delete the report if needed.
 *
 * @param {string} email - The email of the user who reported the book.
 * @param {string} reason - The reason for the report.
 * @param {string} bookTitle - The title of the reported book.
 * @param {string} [explanation] - The explanation for the report (optional).
 * @param {string} reportId - The ID of the report.
 *
 * Usage:
 *
 * ```jsx
 * import { ReportPill } from 'path/to/ReportPill';
 *
 * const App = () => (
 *   <ReportPill
 *     email="user@example.com"
 *     reason="Inappropriate content"
 *     bookTitle="The Book Title"
 *     explanation="This is an explanation for the report."
 *     reportId="report_id"
 *   />
 * );
 * ```
 *
 * This will render a report pill with the specified details and options to view explanation and delete the report.
 */
export const ReportPill = ({
  email,
  reason,
  bookTitle,
  explanation,
  reportId,
}: ReportBookParams) => {
  const { mutate: deleteReport } = useDeleteReportById();

  const onDeleteReport = () => {
    deleteReport(reportId);
  };

  return (
    <div
      className={cn(
        "p-4 m-3 rounded-lg",
        "bg-gradient-to-b from-red-700 to-red-900",
        "flex justify-between items-center"
      )}
    >
      <div className="p-2 flex-col flex gap-1">
        <h3>Reason: {reason}</h3>
        <h2>Book title: {bookTitle}</h2>
        <h1>Email: {email}</h1>

        {/* Explanation Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="text-black my-2">
              View Explanation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Explanation</DialogTitle>
              <DialogDescription>{explanation}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dialog for deleting the report */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="h-[50px] w-[50px]">
            <RxCross2 size={32} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Confirm Deletion</DialogTitle>
            <p className="">{`Are you sure you want to delete the report?`}</p>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={onDeleteReport}
                className="bg-red-700 hover:bg-red-800"
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
