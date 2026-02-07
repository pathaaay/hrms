import { GameCard } from "@/components/games/game-card";
import { useGame } from "@/hooks/game/use-game";
import { LoaderIcon } from "react-hot-toast";

export const GamesPage = () => {
  const { games, isLoading } = useGame();

  if (isLoading)
    return (
      <div>
        <LoaderIcon className="animate-spin size-10!" />
      </div>
    );
  return (
    <div className="grid md:frid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}{" "}
    </div>
  );
};
