import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

            <CardContent>
                <p>
                    <span className="font-semibold">Borrowed:</span>{" "}
                    {borrowedAmount}
                </p>
                <p>
                    <span className="font-semibold">Returned:</span>{" "}
                    {returnedAmount}
                </p>
                <p>
                    <span className="font-semibold">Missing:</span>{" "}
                    {missingAmount}
                </p>
            </CardContent>
        </Card>
    )
}
