import { UpdateInterestedGamesBtn } from "@/components/games/update-interested-games-btn";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGame } from "@/hooks/game/use-game";
import { useUser } from "@/hooks/user/use-user";
import type { IGame } from "@/lib/types/game";
import { useEffect, useState } from "react";

const UpdateInterestedGames = () => {
  const { games } = useGame();
  const { interestedGameIds } = useUser();
  const anchor = useComboboxAnchor();
  const [selectedGames, setSelectedGames] = useState<number[]>([]);

  useEffect(() => {
    if (games.length > 0 && interestedGameIds) {
      setSelectedGames(interestedGameIds);
    }
  }, [interestedGameIds, games]);

  const handleGameValueChange = (value: number) => {
    const newSelectedGames = selectedGames.includes(value)
      ? selectedGames.filter((id) => id != value)
      : [...selectedGames, value];
    setSelectedGames(newSelectedGames);
  };

  if (games.length === 0) return;
  return (
    <div className="flex flex-col gap-2">
      <Separator />
      <Label className="mt-3 text-md">Select Games</Label>
      <Combobox multiple autoHighlight items={games} value={selectedGames}>
        <ComboboxChips ref={anchor} className="w-full">
          <ComboboxValue>
            {(values) => (
              <>
                {values.map((value: number) => (
                  <ComboboxChip key={value}>
                    {games.find(({ id }) => id === value)?.name}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item: IGame) => (
              <ComboboxItem
                onClick={() => handleGameValueChange(item.id)}
                key={item.id}
                value={item.id}
              >
                {item.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <UpdateInterestedGamesBtn
        ids={selectedGames}
        btnText="Update Interested Games"
      />
    </div>
  );
};

export default UpdateInterestedGames;
