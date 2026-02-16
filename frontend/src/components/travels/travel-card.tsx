import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  CalendarDaysIcon,
  MapPinIcon,
  PlaneIcon,
  UserIcon,
} from "lucide-react";
import { CardContentRow } from "../shared/card-content-row";
import { cn } from "@/lib/utils";
import type { ITravel } from "@/lib/types/travel";
import { Button } from "../ui/button";
import { NavLink } from "react-router";

interface TravelCardProps {
  travel: ITravel;
}

export const TravelCard = ({ travel }: TravelCardProps) => {
  return (
    <Card
      className={cn(
        "rounded-2xl h-max shadow-md hover:shadow-xl transition-all duration-300 border-muted hover:scale-[1.01]",
      )}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <PlaneIcon />
              <span className="text-xl font-semibold">{travel.title}</span>
            </div>
            <span className="text-muted-foreground">{travel.description}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <CardContentRow
          Icon={CalendarDaysIcon}
          label={"Start Date"}
          value={new Date(travel.startDate).toLocaleDateString()}
        />
        <CardContentRow
          Icon={CalendarDaysIcon}
          label={"End Date"}
          value={new Date(travel.endDate).toLocaleDateString()}
        />
        <CardContentRow Icon={MapPinIcon} label={"City"} value={travel.city} />
        <CardContentRow
          Icon={MapPinIcon}
          label={"State"}
          value={travel.state}
        />
        <CardContentRow
          Icon={MapPinIcon}
          label={"Country"}
          value={travel.country}
        />
        <CardContentRow
          Icon={UserIcon}
          label={"Created By"}
          value={travel.createdBy.name}
        />
      </CardContent>
      <CardFooter className="flex items-center w-full gap-1">
        <Button variant={"default"} className="grow">
          Expenses
        </Button>
        <Button asChild variant={"secondary"} className="grow">
          <NavLink to={`${travel.id}/documents`}>Documents</NavLink>
        </Button>
      </CardFooter>
    </Card>
  );
};
