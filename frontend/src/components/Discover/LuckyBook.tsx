import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { IoDiceSharp } from "react-icons/io5";
import { useGetRandomBook } from "@/hooks/book/useGetRandomBook";
import { useToast } from "../ui/use-toast";

export const LuckyBook = () => {
  const navigate = useNavigate();
  const { data: randomBook, error } = useGetRandomBook();
  const { toast } = useToast();

  const handleOnClickFeelingLucky = () => {
    if (!randomBook || error) {
      toast({ title: "Failed to Find Book" });
      return;
    }

    const isbnOfRandomBook = randomBook[0].id;
    navigate(`/inspect/${isbnOfRandomBook}`);
    return;
  };

  return (
    <div className="mt-4 font-outfit">
      <Button
        variant="link"
        className="text-green-500 text-md"
        onClick={handleOnClickFeelingLucky}
      >
        <IoDiceSharp size={28} className="mr-3" />I am feeling lucky!
      </Button>
    </div>
  );
};
