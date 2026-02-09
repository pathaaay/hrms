import { getAllUsers } from "@/api/actions/user";
import type { IUserProfile } from "@/lib/types/user";
import { useQuery } from "@tanstack/react-query";

export const useFetchUsersByGameId = (
  gameId: number,
): { isPending: boolean; users: IUserProfile[] | undefined } => {
  const { data: users, isPending } = useQuery<IUserProfile[]>({
    queryKey: [`all-users-by-game-${gameId}`],
    queryFn: () => getAllUsers(gameId),
  });

  return { isPending, users };
};
