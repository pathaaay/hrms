import type { IGame } from "@/lib/types/game";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle } from "../ui/card";

interface GameCardProps {
  game: IGame;
}
export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span>{game.name}</span>
          <Badge variant={"secondary"}>
            {game.startTime}:00 - {game.endTime}:00
          </Badge>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
