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
  return <div>{games.length} GamesPage</div>;
};
