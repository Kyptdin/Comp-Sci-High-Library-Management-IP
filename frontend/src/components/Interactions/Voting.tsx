import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { VscThumbsup } from "react-icons/vsc";
import { VscThumbsdown } from "react-icons/vsc";
import { VscThumbsupFilled } from "react-icons/vsc";
import { VscThumbsdownFilled } from "react-icons/vsc";

export const Voting = () => {
  const [voteValue, setVoteValue] = useState<number>(0);
  const [upvoteValue, setUpvoteValue] = useState<number>(0);
  const [downvoteValue, setDownvoteValue] = useState<number>(0);

  const updateVoteValueTo = (newVoteValue: number) => {
    if (voteValue == newVoteValue) {
      return setVoteValue(0);
    }
    setVoteValue(newVoteValue);
  }

  const updatedUpvoteValue = upvoteValue + (voteValue == 1 ? 1 : 0);
  const updatedDownvoteValue = downvoteValue + (voteValue == -1 ? 1 : 0)

  return (
    <div className="font-outfit full-center justify-start p-2 my-3">
      <div className="full-center flex-col">
        <Button 
          variant="link" 
          className="text-green-500 text-lg"
          onClick={() => updateVoteValueTo(1)}
        >
          {(voteValue != 1) ? 
          <VscThumbsup size={32}/> :
          <VscThumbsupFilled size={32}/>}
        </Button>

        <span>{updatedUpvoteValue}</span>
      </div>

      <div className="full-center flex-col">
        <Button 
          variant="link" 
          className="text-red-500 text-lg"
          onClick={() => updateVoteValueTo(-1)}
        >
          {(voteValue != -1) ? 
          <VscThumbsdown size={32}/> :
          <VscThumbsdownFilled size={32}/>}
        </Button>

        <span>{updatedDownvoteValue}</span>
      </div>
    </div>
  )
}
