import { cn } from "@/lib/utils";
import { TableHead } from "../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  headName: string;
  toolTipText: string;
  headClasses?: string;
}

export const MultiAddTableHead = ({
  headName,
  toolTipText,
  headClasses,
}: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <TableHead
            className={cn(`text-white  flex items-center ${headClasses}`)}
          >
            {headName}
          </TableHead>
        </TooltipTrigger>
        <TooltipContent>
          <p>{toolTipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
