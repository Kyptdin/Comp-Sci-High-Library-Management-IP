import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { StudentStats } from "@/components/StudentSearch/StudentStats";

interface StudentPillProps {
    userName?: string,
    borrowedAmount?: number | string,
    returnedAmount?: number | string,
    missingAmount?: number | string,
    onClick: () => void
}

export const StudentPill = ({
    userName,
    borrowedAmount,
    returnedAmount,
    missingAmount,
    onClick
}: StudentPillProps) => {
    return (
        <Card
            className="cursor-pointer"
            onClick={onClick}
        >
            <CardHeader>
                <CardTitle>{userName}</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-3 gap-2">
                <StudentStats
                    statName="Borrowing"
                    statNumber={borrowedAmount}
                />
                <StudentStats
                    statName="Returned"
                    statNumber={returnedAmount}
                />
                <StudentStats
                    statName="Missing"
                    statNumber={missingAmount}
                    className="bg-red-200 text-red-700 border-red-300"
                />
            </CardContent>
        </Card>
    )
}
