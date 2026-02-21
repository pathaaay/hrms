import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IAchievementPost } from "@/lib/types/achievement-post";
import { useToggleLikeMutation } from "@/api/mutations/achievement-post";

export const PostLikeBtn = ({ post }: { post: IAchievementPost }) => {
  const { mutate: toggleLike, isError } = useToggleLikeMutation();
  const [mounted, setMounted] = useState(false);
  const [liked, setLiked] = useState(post.isLikedByUser);
  const [count, setCount] = useState(post.likesCount);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (liked) setCount((prev) => prev + 1);
    else setCount((prev) => prev - 1);
  }, [liked]);

  useEffect(() => {
    if (isError) setCount((prev) => prev - 1);
  }, [isError]);

  useEffect(() => {
    if (!mounted) return;
    const debounceTimer = setTimeout(() => {
      if (liked != post.isLikedByUser) toggleLike({ postId: post.id });
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [liked]);

  const handleToggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <span className="shrink-0 grow text-muted-foreground text-sm flex items-center justify-center gap-0">
      <Button
        onClick={handleToggleLike}
        className="group relative hover:bg-transparent!"
        variant="ghost"
        size={"icon"}
      >
        <HeartIcon
          className={cn(
            `transition absolute group-hover:text-red-300`,
            liked ? "scale-0" : "scale-100",
          )}
        />
        <HeartIcon
          className={cn(
            `transition absolute `,
            liked ? "fill-red-500 text-red-500 scale-100" : "scale-0",
          )}
        />
      </Button>
      <span className="hidden sm:inline">
        {count > 1000 ? (count / 1000).toFixed(2) + "k" : count}
      </span>
    </span>
  );
};
