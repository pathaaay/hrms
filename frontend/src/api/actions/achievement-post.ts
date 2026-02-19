import type { FetchAllPostsProps } from "@/hooks/achievement-posts/use-fetch-all-posts";
import { apiService } from "@/lib/axios";

const ACHIEVEMENT_POST_ENDPOINT = "/achievement-posts";

export const getAllPosts = async ({
  tagId,
  userId,
  isPersonal,
}: FetchAllPostsProps) => {
  let endpoint;
  if (isPersonal) endpoint = `${ACHIEVEMENT_POST_ENDPOINT}/me`;
  else if (tagId) endpoint = `${ACHIEVEMENT_POST_ENDPOINT}/tag/${tagId}`;
  else if (userId) endpoint = `${ACHIEVEMENT_POST_ENDPOINT}/${userId}`;
  else endpoint = `${ACHIEVEMENT_POST_ENDPOINT}`;

  const res = await apiService.get(endpoint);
  return res.data;
};

export const toggleLike = async ({ postId }: { postId: number | string }) => {
  const res = await apiService.post(
    `${ACHIEVEMENT_POST_ENDPOINT}/likes/${postId}`,
  );
  return res.data;
};

export const deletePost = async ({ postId }: { postId: number | string }) => {
  const res = await apiService.delete(
    `${ACHIEVEMENT_POST_ENDPOINT}/${postId}`,
  );
  return res.data;
};

export const deleteInAppropriatePost = async ({ postId }: { postId: number | string }) => {
  const res = await apiService.delete(
    `${ACHIEVEMENT_POST_ENDPOINT}/${postId}/inappropriate`,
  );
  return res.data;
};
