import DataTable from "@/components/common/data-table";
import { GoBackBtn } from "@/components/shared/go-back-btn";
import { Badge } from "@/components/ui/badge";
import { useFetchUserGameBookings } from "@/hooks/user/use-game-bookings";
import type { IGameBooking } from "@/lib/types/game";
import type { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<IGameBooking>[] = [
  {
    header: "Game",
    accessorKey: "team.game.name",
    cell: ({ row }) => <div>{row.original.team.game.name}</div>,
    enableSorting: false,
    filterFn: (row, id, value) => {
      console.log({ row, id, value });
      return true;
    },
  },
  {
    header: "Status",
    accessorKey: "confirmed",
    cell: ({ row }) => {
      return (
        <Badge variant={row.getValue("confirmed") ? "default" : "secondary"}>
          {row.getValue("confirmed") ? "Confirmed" : "Pending"}
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
    filterFn: (row, id, value) => {
      console.log({ row, id, value });
      if (value == "true" && row.original.confirmed) return true;
      else if (value == "false" && !row.original.confirmed) return true;
      return false;
    },
  },
  {
    header: "Total Members",
    accessorKey: "team.gameTeamMembers",
    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        {row.original.team.gameTeamMembers.length + 1}
      </div>
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
      filterVariant: "select",
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
];

export const UserGameBookingPage = () => {
  const { bookings, isPending } = useFetchUserGameBookings();
  if (isPending) return;
  console.log({ bookings });

  return (
    <div className="flex flex-col items-center gap-2 relative">
      <GoBackBtn to={"/games"} />
      <div className="mt-20 w-full">
        <DataTable columns={columns} data={bookings || []} filterColumns={["confirmed"]} />
      </div>
    </div>
  );
};
