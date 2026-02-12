import { GameCard } from "@/components/games/game-card";
import { CustomEmpty } from "@/components/shared/custom-empty";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGame } from "@/hooks/game/use-game";
import { useUser } from "@/hooks/user/use-user";
import { NavLink } from "react-router";

export const GamesPage = () => {
  const { games, isLoading } = useGame();
  const { interestedGameIds } = useUser();
  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium">All Games</div>
        <Button variant={"secondary"} asChild>
          <NavLink to={"bookings"}>View your bookings</NavLink>
        </Button>
      </div>

      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((ele) => (
            <Skeleton key={ele} className="h-60 w-full" />
          ))}
        </div>
      )}

      {!isLoading && games.length === 0 && (
        <CustomEmpty
          title="No games"
          description="There are no games available for now"
        />
      )}

      {games.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard
              game={game}
              key={game.id}
              showBookBtn={interestedGameIds.includes(game.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
