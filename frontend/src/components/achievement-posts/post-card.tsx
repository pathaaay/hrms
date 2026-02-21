import { MessageCircleIcon, MoreVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { IAchievementPost } from "@/lib/types/achievement-post";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavLink } from "react-router";
import { useUser } from "@/hooks/user/use-user";
import { useHasRole } from "@/hooks/user/use-has-role";
import { ROLES } from "@/lib/types/user";
import { convertToPublicUrl } from "@/lib/utils";
import { MoreMenu } from "./post-more-menu";
import { PostLikeBtn } from "./post-like-btn";
import { PostCommentForm } from "./post-comment-form";
import { useState } from "react";

export const AchievementPostCard = ({ post }: { post: IAchievementPost }) => {
  const { userProfile } = useUser();
  const isHr = useHasRole([ROLES.HR]);
  const [isCommentBoxShown, setIsCommentBoxShown] = useState(false);

  return (
    <Card className="w-full gap-0 py-0 shadow-none">
      <CardHeader className="-mr-1 flex flex-row items-center justify-between py-2.5">
        <Item className="w-full gap-2.5 p-0 flex items-center justify-between">
          <NavLink to={`/achievement-posts/user/${post.author.id}`}>
            <ItemHeader>
              <ItemMedia>
                <Avatar className="size-10 rounded-lg">
                  <AvatarImage
                    src={convertToPublicUrl(post.author?.avatarFilePath)}
                    alt={post.author?.name}
                    className="size-10"
                  />
                  <AvatarFallback className="rounded-lg">
                    {post.author?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-0">
                <ItemTitle>{post.author.name}</ItemTitle>
                <ItemDescription className="text-xs">
                  {post.author.email}
                </ItemDescription>
              </ItemContent>
            </ItemHeader>
          </NavLink>
          {(post.author.id === userProfile?.userId || isHr) && (
            <ItemActions>
              <MoreMenu id={post.id} />
            </ItemActions>
          )}
        </Item>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-6 py-5">
          <NavLink
            className="w-full gap-0 py-0 shadow-none"
            to={`/achievement-posts/${post.id}`}
          >
            <h2 className="font-semibold">{post.title}</h2>
            <div className="mt-1 text-muted-foreground text-sm">
              {post.description}
            </div>
          </NavLink>
          <div className="flex items-start flex-wrap gap-1">
            {post.achievementPostTags.map((tag) => (
              <NavLink
                key={tag.name + "_" + tag.id}
                to={`/achievement-posts/tag/${tag.id}`}
              >
                <span className="text-blue-500 text-sm">#{tag.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex border-t px-2 py-2! pb-0">
        {isCommentBoxShown ? (
          <PostCommentForm
            postId={post.id}
            setIsCommentBoxShown={setIsCommentBoxShown}
          />
        ) : (
          <>
            <PostLikeBtn post={post} />
            <Button
              className="shrink-0 grow text-muted-foreground"
              variant="ghost"
              onClick={() => setIsCommentBoxShown(true)}
            >
              <MessageCircleIcon />
              <span className="hidden sm:inline">{post.commentsCount}</span>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
