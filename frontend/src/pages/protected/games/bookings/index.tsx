import { CustomLoader } from "@/components/common/custol-loader";
import DataTable from "@/components/common/data-table";
import { DeleteBookingBtn } from "@/components/games/delete-booking-btn";
import { GoBackBtn } from "@/components/shared/go-back-btn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useFetchUserGameBookings } from "@/hooks/user/use-user-game-bookings";
import type { IGameBooking } from "@/lib/types/game";
import { formatMinutesToHours } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

const columns: ColumnDef<IGameBooking>[] = [
  {
    header: "#Id",
    accessorKey: "id",
    id: "id",
    cell: ({ row }) => <div className="pl-2">{row.original.id}</div>,
    enableSorting: false,
    meta: {
      filterVariant: "select",
      bindLabel: "",
      bindValue: "",
    },
  },
  {
    header: "Game",
    accessorKey: "team.game.name",
    id: "team.game.name",
    cell: ({ row }) => <div>{row.original.team.game.name}</div>,
    enableSorting: false,
    meta: {
      filterVariant: "select",
      bindLabel: "",
      bindValue: "",
    },
  },
  {
    header: "Status",
    accessorKey: "isConfirmed",
    cell: ({ row }) => {
      return (
        <Badge variant={row.getValue("isConfirmed") ? "default" : "secondary"}>
          {row.getValue("isConfirmed") ? "Confirmed" : "Pending"}
        </Badge>
      );
    },
    enableSorting: false,
    meta: {
      filterVariant: "select",
      filterLabels: {
        true: "Confirmed",
        false: "Pending",
      },
    },
    filterFn: (row, _, value) => {
      if (!value) return true;

      if (
        (value == "true" && row.original.isConfirmed) ||
        (value == "false" && !row.original.isConfirmed)
      )
        return true;
      return false;
    },
  },
  {
    header: "Start Time",
    accessorKey: "startTime",
    cell: ({ row }) => (
      <div>{formatMinutesToHours(row.original.startTime)}</div>
    ),
    enableSorting: false,
  },
  {
    header: "End Time",
    accessorKey: "endTime",
    cell: ({ row }) => <div>{formatMinutesToHours(row.original.endTime)}</div>,
    enableSorting: false,
  },
  {
    header: "Members",
    accessorKey: "team.gameTeamMembers",
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-optional"
            className="w-max justify-between font-normal"
          >
            {row.original.team.gameTeamMembers.length + 1}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          {row?.original?.team?.gameTeamMembers?.map((member) => (
            <>
              <div
                className="flex flex-col gap-1 p-3 text-xs text-muted-foreground"
                key={member.id}
              >
                <div className="text-foreground">{member.name}</div>
                <div>{member.email}</div>
              </div>
              <Separator />
            </>
          ))}
        </PopoverContent>
      </Popover>
    ),
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Slot Date",
    accessorKey: "bookedSlotDate",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("bookedSlotDate")).toLocaleDateString()}</div>
    ),
    meta: {
      filterVariant: "calendar",
    },
    filterFn: (row, _, value) => {
      if (!value) return true;

      if (
        format(row.original.bookedSlotDate, "yyyy-MM-dd") ==
        format(value, "yyyy-MM-dd")
      )
        return true;
      return false;
    },
  },
  {
    header: "Booked on",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
    ),
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <DeleteBookingBtn id={row.original.id} />
      </div>
    ),
    meta: {
      filterVariant: "select",
    },
  },
];

export const UserGameBookingPage = () => {
  const { bookings, isPending } = useFetchUserGameBookings();
  if (isPending) return <CustomLoader />;

  return (
    <div className="flex flex-col items-center gap-2 relative">
      <GoBackBtn to={"/games"} />
      <div className="mt-20 w-full">
        <div className="text-xl font-medium mb-2">Your Bookings</div>
        <DataTable
          columns={columns}
          data={bookings || []}
          filterColumns={["team.game.name", "isConfirmed", "bookedSlotDate"]}
        />
      </div>
    </div>
  );
};
