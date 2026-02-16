import { CustomLoader } from "@/components/common/custol-loader";
import { useFetchAllTravels } from "@/hooks/travel/use-fetch-travels";
import { Outlet } from "react-router";

export const TravelsLayout = () => {
  const { isPending } = useFetchAllTravels();

  if (isPending) return <CustomLoader />;

  return <Outlet />;
};
