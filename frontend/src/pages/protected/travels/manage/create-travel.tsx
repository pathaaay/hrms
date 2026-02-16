import { ManageTravelForm } from "@/components/travels/forms/travel-form";
import type { IUserProfile } from "@/lib/types/user";
import { useOutletContext } from "react-router";

export const CreateTravelPage = () => {
  const { users } = useOutletContext<{ users: IUserProfile[] }>();
  return (
    <div className="flex flex-col gap-2">
      <ManageTravelForm users={users} />
    </div>
  );
};
