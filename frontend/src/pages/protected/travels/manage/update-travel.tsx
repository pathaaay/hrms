import { CustomLoader } from "@/components/common/custol-loader";
import { ManageTravelForm } from "@/components/travels/forms/travel-form";
import { useTravel } from "@/hooks/travel/use-travel";
import { emitGoBack } from "@/lib/helpers/events/go-back-event";
import type { IUserProfile } from "@/lib/types/user";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router";

export const UpdateTravelPage = () => {
  const { travelId } = useParams();
  const { createdTravels, isCreatedTravelsLoading } = useTravel();
  const { users } = useOutletContext<{ users: IUserProfile[] }>();
  const singleTravel = createdTravels.find(({ id }) => id === Number(travelId));

  useEffect(() => {
    if (!isCreatedTravelsLoading && !singleTravel) emitGoBack("/travels");
  }, [isCreatedTravelsLoading]);

  return (
    <div className="flex flex-col gap-2">
      {isCreatedTravelsLoading && <CustomLoader />}
      {!isCreatedTravelsLoading && singleTravel && (
        <ManageTravelForm users={users} singleTravel={singleTravel} />
      )}
    </div>
  );
};
