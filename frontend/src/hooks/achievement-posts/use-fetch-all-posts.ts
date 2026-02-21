import { getAllPosts } from "@/api/actions/achievement-post";
import type { IAchievementPost } from "@/lib/types/achievement-post";
import { useQuery } from "@tanstack/react-query";

export interface FetchAllPostsProps {
  tagId?: string;
  isPersonal?: boolean;
  userId?: string;
}

export const useFetchAllPosts = ({
  tagId,
  isPersonal,
  userId,
}: FetchAllPostsProps): {
  isPending: boolean;
  posts: IAchievementPost[] | undefined;
} => {
  const { data: posts, isPending } = useQuery<IAchievementPost[]>({
    queryKey: tagId
      ? [`all-posts-${tagId}`]
      : userId
        ? [`all-posts-${userId}`]
        : isPersonal
          ? [`all-posts-personal`]
          : [`all-posts`],
    queryFn: () => getAllPosts({ tagId, userId, isPersonal }),
  });

  return { isPending, posts };
};
