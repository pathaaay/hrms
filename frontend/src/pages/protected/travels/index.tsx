import { CustomEmpty } from "@/components/shared/custom-empty";
import { TravelCard } from "@/components/travels/travel-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTravel } from "@/hooks/travel/use-travel";
import { useHasRole } from "@/hooks/user/use-has-role";
import { ROLES } from "@/lib/types/user";
import { NavLink } from "react-router";

export const TravelPage = () => {
  const { travels, isTravelsLoading } = useTravel();
  const canManageTravels = useHasRole([ROLES.HR]);

  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium">All Games</div>
        {canManageTravels && (
          <Button variant={"secondary"} asChild>
            <NavLink to={"manage"}>Manage Travels</NavLink>
          </Button>
        )}
      </div>

      {isTravelsLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((ele) => (
            <Skeleton key={ele} className="h-60 w-full" />
          ))}
        </div>
      )}

      {!isTravelsLoading && travels.length === 0 && (
        <CustomEmpty
          title="No travels"
          description="There are no travels available for you"
        />
      )}

      {travels.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travels.map((travel) => (
            <TravelCard key={travel.id} travel={travel} />
          ))}
        </div>
      )}
    </div>
  );
};
