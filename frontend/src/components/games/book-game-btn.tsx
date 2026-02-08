import { useUpdateInterestedGames } from "@/api/mutations/user";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/user/use-user";

export const BookGameBtn = ({ id }: { id: number }) => {
  const { mutate } = useUpdateInterestedGames();
  const { interestedGameIds } = useUser();
  return (
    <Button
      onClick={() => mutate([id, ...interestedGameIds])}
      variant={"outline"}
      className="w-full mt-4 rounded-xl"
    >
      Add game to your interests
    </Button>
  );
};
