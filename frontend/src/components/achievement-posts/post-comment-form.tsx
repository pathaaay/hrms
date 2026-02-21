import { useState, type SetStateAction } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const PostCommentForm = ({
  setIsCommentBoxShown,
  postId,
}: {
  setIsCommentBoxShown: React.Dispatch<SetStateAction<boolean>>;
  postId: number | string;
}) => {
  const [comment, setComment] = useState("");

  const handleComment = () => {
    console.log(comment);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <div className="flex items-center justify-center flex-col gap-1">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            setComment("");
            setIsCommentBoxShown(false);
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleComment} variant={"secondary"} size={"sm"}>
          Submit
        </Button>
      </div>
    </div>
  );
};
