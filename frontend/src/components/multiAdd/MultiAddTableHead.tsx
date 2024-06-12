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
  toolTipClasses?: string;
}

export const MultiAddTableHead = ({
  headName,
  toolTipText,
  headClasses,
  toolTipClasses,
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
          <p className={cn(toolTipClasses)}>{toolTipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
