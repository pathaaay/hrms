import { AchievementPostCard } from "@/components/achievement-posts/post-card";
import { useFetchAllPosts } from "@/hooks/achievement-posts/use-fetch-all-posts";
import { useParams } from "react-router";

export const AchievementPostsPage = () => {
  const { tagId, userId } = useParams();

  const { posts } = useFetchAllPosts({ tagId, userId });

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col gap-2 items-center">
        {posts?.map((post) => (
          <AchievementPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
