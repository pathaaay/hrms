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
import { useEffect, useState } from "react";

const UpdateInterestedGames = () => {
  const { games } = useGame();
  const anchor = useComboboxAnchor();
  const { interestedGameIds } = useUser();
  const [selectedGames, setSelectedGames] = useState<number[]>([]);

  useEffect(() => {
    if (interestedGameIds) {
      setSelectedGames(interestedGameIds);
    }
  }, [interestedGameIds]);

  if (games.length === 0) return;
  return (
    <div className="flex flex-col gap-2">
      <Separator />
      <Label className="mt-3 text-md">Select Games</Label>
      <Combobox
        multiple
        autoHighlight
        items={games.map(({ id }) => id)}
        value={selectedGames}
        onValueChange={setSelectedGames}
      >
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
            {(item: number) => (
              <ComboboxItem key={item} value={item}>
                {games.find(({ id }) => id === item)?.name}
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
