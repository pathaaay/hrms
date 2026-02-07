import { useFetchGames } from "@/hooks/game/use-fetch-games";
import { Outlet } from "react-router";

export const GameLayout = () => {
  // Fetching games in /games and its children routes
  useFetchGames();
  return <Outlet />;
};
