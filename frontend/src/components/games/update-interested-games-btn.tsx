import { useUpdateInterestedGamesMutation } from "@/api/mutations/user";
import { Button } from "../ui/button";

export const UpdateInterestedGamesBtn = ({
  ids,
  btnText,
}: {
  ids: number[];
  btnText: string;
}) => {
  const { mutate } = useUpdateInterestedGamesMutation();

  return (
    <Button
      onClick={() => mutate(ids)}
      variant={"outline"}
      className="w-full mt-4 rounded-xl"
    >
      {btnText}
    </Button>
  );
};
