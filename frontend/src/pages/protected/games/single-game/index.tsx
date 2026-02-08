import { GameBooking } from "@/components/games/game-booking";
import { GameCard } from "@/components/games/game-card";
import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/game/use-game";
import { useUser } from "@/hooks/user/use-user";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router";

export const SingleGamePage = () => {
  const { gameId } = useParams();
  const { interestedGameIds } = useUser();
  const { isLoading, games } = useGame();
  const navigate = useNavigate();
  const singleGame = games.find(({ id }) => id === Number(gameId));

  useEffect(() => {
    //If games is loaded but not found in game array then redirect to the games page
    if (
      (!isLoading && !singleGame) ||
      // Check if the user has no interest in this game.
      (singleGame && !interestedGameIds.includes(singleGame.id))
    )
      navigate("/games", { replace: true });
  }, [singleGame, isLoading]);

  if (!singleGame) return;

  return (
    <div className="flex flex-col items-center gap-2 relative">
      <Button variant={"secondary"} className="absolute left-0" asChild>
        <NavLink to={"/games"}>
          <ArrowLeftIcon className="size-4!" />
          Go Back
        </NavLink>
      </Button>
      <div className="w-full max-w-lg mt-20 mb-5">
        <GameCard showBookBtn={false} game={singleGame} />
      </div>
      <GameBooking game={singleGame} />
      <Outlet />
    </div>
  );
};
