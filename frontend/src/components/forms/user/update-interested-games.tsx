import { MultiSelect } from "@/components/common/multi-select";
import { UpdateInterestedGamesBtn } from "@/components/games/update-interested-games-btn";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGame } from "@/hooks/game/use-game";
import { useUser } from "@/hooks/user/use-user";
import { createMultiSelectOption } from "@/lib/utils";
import { useState } from "react";

const UpdateInterestedGames = () => {
  const { games } = useGame();
  const { interestedGameIds } = useUser();
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const options = games?.map((game) =>
    createMultiSelectOption(game.id.toString(), game.name),
  );

  if (games.length === 0) return;
  return (
    <div className="flex flex-col gap-2">
      <Separator />
      <Label className="mt-3 text-md">Select Games</Label>
      <MultiSelect
        options={options || []}
        onValueChange={setSelectedGames}
        defaultValue={interestedGameIds.map(String)}
      />
      <UpdateInterestedGamesBtn
        ids={selectedGames.map(Number)}
        btnText="Update Interested Games"
      />
    </div>
  );
};

export default UpdateInterestedGames;
