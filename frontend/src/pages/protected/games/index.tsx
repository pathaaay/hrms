import { GameCard } from "@/components/games/game-card";
import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/game/use-game";
import { useUser } from "@/hooks/user/use-user";
import { LoaderIcon } from "react-hot-toast";
import { NavLink } from "react-router";

export const GamesPage = () => {
  const { games, isLoading } = useGame();
  const { interestedGameIds } = useUser();
  if (isLoading)
    return (
      <div>
        <LoaderIcon className="animate-spin size-10!" />
      </div>
    );
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium">All Games</div>
        <Button variant={"secondary"} asChild>
          <NavLink to={"bookings"}>View your bookings</NavLink>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard
            game={game}
            key={game.id}
            showBookBtn={interestedGameIds.includes(game.id)}
          />
        ))}
      </div>
    </div>
  );
};
