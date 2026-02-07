import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/game/use-game";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router";

export const SingleGamePage = () => {
  const { gameId } = useParams();
  const { isLoading, games } = useGame();
  const navigate = useNavigate();
  const singleGame = games.find(({ id }) => id === Number(gameId));

  useEffect(() => {
    //If games is loaded but not found in game array then redirect to the games page
    if (!isLoading && !singleGame) navigate("/games", { replace: true });
  }, [singleGame, isLoading]);

  return (
    <div className="flex flex-col items-center gap-2 relative">
      <Button variant={"secondary"} className="absolute left-0" asChild>
        <NavLink to={"/games"}>
          <ArrowLeftIcon className="size-4!" />
          Go Back
        </NavLink>
      </Button>
      <div className="w-full mt-20 flex items-center relative justify-center">
        <div className="text-3xl font-semibold mt-">{singleGame?.name}</div>
      </div>
    </div>
  );
};
