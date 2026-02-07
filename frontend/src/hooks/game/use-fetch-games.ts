import { getAllGames } from "@/api/actions/game";
import type { IGame } from "@/lib/types/game";
import { setGames } from "@/store/slices/game-slice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchGames = () => {
  const dispatch = useDispatch();

  const { data: games } = useQuery<IGame[]>({
    queryKey: ["all-games"],
    queryFn: getAllGames,
  });
  useEffect(() => {
    if (games?.length && games?.length > 0) dispatch(setGames(games));
    return () => {};
  }, [games, dispatch]);
};
