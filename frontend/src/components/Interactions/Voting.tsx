import { Button } from "@/components/ui/button";
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";
import { useDownvoteBook } from "@/hooks/userBookRating/useDownvoteBook";
import { useGetBookUpvoteAndDownvoteById } from "@/hooks/userBookRating/useGetBookUpvoteAndDownvoteById";
import { useGetUserLatestRatingOnBook } from "@/hooks/userBookRating/useGetUserLatestRatingOnBook";
import { useUpvoteBook } from "@/hooks/userBookRating/useUpvoteBook";

import { VscThumbsup } from "react-icons/vsc";
import { VscThumbsdown } from "react-icons/vsc";
import { VscThumbsupFilled } from "react-icons/vsc";
import { VscThumbsdownFilled } from "react-icons/vsc";
import { useParams } from "react-router-dom";

export const Voting = () => {
  const { bookInspectIsbn } = useParams();
  const { data: loggedInUserData } = useGetLoggedInUser();
  const userId = loggedInUserData?.userMetaData[0].user_id;

  const { mutateAsync: upvoteBook, isPending: isUpvotingBook } = useUpvoteBook(
    bookInspectIsbn,
    userId
  );
  const { mutateAsync: downvoteBook, isPending: isDownvotingBook } =
    useDownvoteBook(bookInspectIsbn, userId);

  const { data: downAndUpvoteData, isLoading: upvoteAndDownVoteDataLoading } =
    useGetBookUpvoteAndDownvoteById(bookInspectIsbn);
  const { data: userRatingOnBook, isLoading: isGettingUserBookRating } =
    useGetUserLatestRatingOnBook(bookInspectIsbn, userId);

  const displayUpvoteAndDownvoteButtons =
    !upvoteAndDownVoteDataLoading &&
    !isGettingUserBookRating &&
    downAndUpvoteData &&
    userRatingOnBook;
  const currentUpvotes = displayUpvoteAndDownvoteButtons
    ? downAndUpvoteData.upvoteData.totalUpvotes
    : null;
  const currentDownvotes = displayUpvoteAndDownvoteButtons
    ? downAndUpvoteData.downVoteData.totalDownvotes
    : null;
  const userUpvotedBook =
    displayUpvoteAndDownvoteButtons && userRatingOnBook.length > 0
      ? userRatingOnBook[0].is_upvote
      : undefined;

  const notAllowedToUpOrDownVote = isUpvotingBook || isDownvotingBook;

  const handleUpvoteOrDownvote = (isUpvote: boolean) => {
    if (!userId || !bookInspectIsbn) return;
    if (isUpvote) {
      upvoteBook({ userId, bookId: bookInspectIsbn });
      return;
    }
    downvoteBook({ userId, bookId: bookInspectIsbn });
  };

  return (
    <div className="font-outfit full-center justify-start p-2 my-3">
      <div className="full-center flex-col">
        <Button
          className={`text-green-500 text-lg p-2 `}
          onClick={() => handleUpvoteOrDownvote(true)}
          disabled={notAllowedToUpOrDownVote}
          variant="link"
        >
          {userUpvotedBook ? (
            <VscThumbsupFilled size={32} />
          ) : (
            <VscThumbsup size={32} />
          )}
        </Button>

        <span>{currentUpvotes}</span>
      </div>

      <div className="full-center flex-col">
        <Button
          className="text-red-500 text-lg p-2"
          onClick={() => handleUpvoteOrDownvote(false)}
          disabled={notAllowedToUpOrDownVote}
          variant="link"
        >
          {userUpvotedBook === false ? (
            <VscThumbsdownFilled size={32} />
          ) : (
            <VscThumbsdown size={32} />
          )}
        </Button>

        <span>{currentDownvotes}</span>
      </div>
    </div>
  );
};
