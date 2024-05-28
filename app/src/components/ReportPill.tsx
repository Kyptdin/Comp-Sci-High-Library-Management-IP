import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { RxCross2 } from "react-icons/rx";

interface reportBookParams {
  email: string,
  reason: string,
  bookTitle: string,
  explanation?: string
}

export const ReportPill = ({
  email, 
  reason, 
  bookTitle, 
  explanation
} : reportBookParams) => {
  return (
    <div className={cn(
      "p-4 m-3 rounded-lg",
      "bg-gradient-to-b from-red-700 to-red-900",
      "flex justify-between items-center"
    )}>
      <div className='p-2 flex-col flex gap-1'>
        <h3>Reason: {reason}</h3>
        <h2>Book title: {bookTitle}</h2>
        <h1>Email: {email}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="secondary"
              className='text-black my-2'
            >View Explanation</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Explanation</DialogTitle>
              <DialogDescription>{explanation}</DialogDescription>
            </DialogHeader>
          </DialogContent>
          </Dialog>
      </div>

      <Button variant="ghost" className="h-[50px] w-[50px]">
        <RxCross2 size={32}/>
      </Button>
    </div>
  )
}