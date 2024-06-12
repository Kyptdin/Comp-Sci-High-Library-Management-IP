import { TableHead } from "../ui/table";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../ui/tooltip";

interface Props {
  headName: string;
  toolTipText: string;
  headClasses?: string;
}

export const MultiAddTableHead = ({
  headName,
}: // headClasses,
Props) => {
  return (
    <TableHead className={`text-white text-left bg-red-500`}>
      {headName}
    </TableHead>
  );
};
