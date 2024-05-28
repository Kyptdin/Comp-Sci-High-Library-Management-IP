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

interface ReportBookParams {
  email: string;
  reason: string;
  bookTitle: string;
  explanation?: string;
  reportId: string;
}

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

      {/* Used to delete the report */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="h-[50px] w-[50px]">
            <RxCross2 size={32} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Confirm Deletion</DialogTitle>
            <p className="">{`Are you want to delete the report?`}</p>
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
