import type { IUser } from "./user";

export interface IAchivementPostTag {
  id: number;
  name: string;
}
export interface IAchievementPost {
  id: number;
  title: string;
  description: string;
  author: IUser;
  createdAt: string;
  isPublic: boolean;
  likesCount: number;
  isLikedByUser: boolean;
  commentsCount: number;
  achievementPostTags: IAchivementPostTag[];
}
