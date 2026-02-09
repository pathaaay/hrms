import DataTable from "@/components/common/data-table";
import { GoBackBtn } from "@/components/shared/go-back-btn";
import { Badge } from "@/components/ui/badge";
import { useFetchUserGameBookings } from "@/hooks/user/use-game-bookings";
import type { IGameBooking } from "@/lib/types/game";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<IGameBooking>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => <div>${row.getValue("price")}</div>,
    enableSorting: false,
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const availability: string = row.getValue("status");

      const styles = {
        "In Stock":
          "bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5",
        "Out of Stock":
          "bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive",
        Limited:
          "bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5",
      }[availability];

      return (
        <Badge
          className={(cn("border-none focus-visible:outline-none"), styles)}
        >
          {row.getValue("availability")}
        </Badge>
      );
    },
    enableSorting: false,
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Rating",
    accessorKey: "rating",
    cell: ({ row }) => <div>{row.getValue("rating")}</div>,
    meta: {
      filterVariant: "range",
    },
  },
];

export const UserGameBookingPage = () => {
  const { bookings, isPending } = useFetchUserGameBookings();
  if (isPending) return;

  return (
    <div className="flex flex-col items-center gap-2 relative">
      <GoBackBtn to={"/games"} />
      <div className="mt-20 w-full">
        <DataTable columns={columns} data={bookings || []} />
      </div>
    </div>
  );
};
