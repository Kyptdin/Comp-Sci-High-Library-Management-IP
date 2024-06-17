import { Button } from "@/components/ui/button";
import { useGetBookRatingByBookId } from "@/hooks/bookRating/useGetBookRatingByBookId";
import { useUpvoteBook } from "@/hooks/bookRating/useUpvoteBook";
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";

import { VscThumbsup } from "react-icons/vsc";
import { VscThumbsdown } from "react-icons/vsc";
import { VscThumbsupFilled } from "react-icons/vsc";
import { VscThumbsdownFilled } from "react-icons/vsc";
import { useParams } from "react-router-dom";

export const Voting = () => {
  const { bookInspectIsbn } = useParams();
  const { data: bookRatingData } = useGetBookRatingByBookId(bookInspectIsbn);
  const { mutate: upvoteBook } = useUpvoteBook();
  const { data: loggedInUserData } = useGetLoggedInUser();

  const handleUpvoteButtonClick = () => {
    const userId = loggedInUserData?.generalUserData.id;
    if (!userId || !bookInspectIsbn) return;
    upvoteBook({ userId, bookId: bookInspectIsbn });
  };

  return (
    <div className="font-outfit full-center justify-start p-2 my-3">
      <div className="full-center flex-col">
        <Button
          variant="link"
          className="text-green-500 text-lg p-2"
          onClick={handleUpvoteButtonClick}
        >
          <VscThumbsup size={32} />
          <VscThumbsupFilled size={32} />
        </Button>

        {bookRatingData && bookRatingData.length > 0 && (
          <span>{bookRatingData[0].upvotes}</span>
        )}
      </div>

      <div className="full-center flex-col">
        <Button variant="link" className="text-red-500 text-lg p-2">
          <VscThumbsdown size={32} />
          <VscThumbsdownFilled size={32} />
        </Button>

        {bookRatingData && bookRatingData.length > 0 && (
          <span>{bookRatingData[0].downvotes}</span>
        )}
      </div>
    </div>
  );
};
