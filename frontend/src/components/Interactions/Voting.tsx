import { Button } from "@/components/ui/button";
import { useGetBookRatingByBookId } from "@/hooks/bookRating/useGetBookRatingByBookId";
import { useUpvoteBook } from "@/hooks/bookRating/useUpvoteBook";
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";
import { useGetUserBookRatingByUserIdAndRatingId } from "@/hooks/userBookRating/useGetUserBookRatingByUserIdAndRatingId";

import { VscThumbsup } from "react-icons/vsc";
import { VscThumbsdown } from "react-icons/vsc";
import { VscThumbsupFilled } from "react-icons/vsc";
import { VscThumbsdownFilled } from "react-icons/vsc";
import { useParams } from "react-router-dom";

export const Voting = () => {
  const { bookInspectIsbn } = useParams();
  const { data: bookRatingData } = useGetBookRatingByBookId(bookInspectIsbn);
  const { data: loggedInUserData } = useGetLoggedInUser();
  const userId = loggedInUserData?.userMetaData[0].user_id;
  const ratingId = bookRatingData ? bookRatingData[0].id : undefined;
  const { mutate: upvoteBook } = useUpvoteBook(
    bookInspectIsbn,
    userId,
    ratingId
  );
  const { data: userBookRatingData } = useGetUserBookRatingByUserIdAndRatingId(
    userId,
    ratingId
  );

  const handleUpvoteButtonClick = () => {
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
          {userBookRatingData &&
          userBookRatingData.length > 0 &&
          userBookRatingData[0].is_upvote &&
          userBookRatingData[0].is_upvote !== null ? (
            <VscThumbsupFilled size={32} />
          ) : (
            <VscThumbsup size={32} />
          )}
        </Button>

        {bookRatingData && userBookRatingData && bookRatingData.length > 0 && (
          <span>{bookRatingData[0].upvotes}</span>
        )}
      </div>

      <div className="full-center flex-col">
        <Button variant="link" className="text-red-500 text-lg p-2">
          {userBookRatingData &&
          userBookRatingData.length > 0 &&
          !userBookRatingData[0].is_upvote &&
          userBookRatingData[0].is_upvote !== null ? (
            <VscThumbsdownFilled size={32} />
          ) : (
            <VscThumbsdown size={32} />
          )}
        </Button>

        {bookRatingData && bookRatingData.length > 0 && (
          <span>{bookRatingData[0].downvotes}</span>
        )}
      </div>
    </div>
  );
};
