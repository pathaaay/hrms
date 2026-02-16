import { useHasRole } from "@/hooks/user/use-has-role";
import { useUser } from "@/hooks/user/use-user";
import { emitGoBack } from "@/lib/helpers/events/go-back-event";
import { ROLES } from "@/lib/types/user";
import { CustomLoader } from "@/components/common/custol-loader";
import DataTable from "@/components/common/data-table";
import { DeleteJobBtn } from "@/components/jobs/delete-job-btn";
import { GoBackBtn } from "@/components/shared/go-back-btn";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import type { ITravel } from "@/lib/types/travel";
import { useTravel } from "@/hooks/travel/use-travel";

let columns: ColumnDef<ITravel>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-2">{row.original.id}</div>,
  },
  {
    header: "Title",
    accessorKey: "title",
    id: "title",
    cell: ({ row }) => (
      <div
        className="text-sm overflow-hidden text-ellipsis max-w-30"
        title={row.original.title}
      >
        {row.original.title}
      </div>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
    id: "description",
    cell: ({ row }) => (
      <div
        className="text-xs overflow-hidden text-ellipsis max-w-30"
        title={row.original.description}
      >
        {row.original.description}
      </div>
    ),
  },
  {
    header: "Start Date",
    accessorKey: "startDate",
    id: "startDate",
    cell: ({ row }) => (
      <div className="max-w-30">
        {new Date(row.original.startDate).toLocaleDateString()}
      </div>
    ),
    meta: {
      filterVariant: "calendar",
    },
  },
  {
    header: "End Date",
    accessorKey: "endDate",
    id: "endDate",
    cell: ({ row }) => (
      <div className="max-w-30">
        {new Date(row.original.endDate).toLocaleDateString()}
      </div>
    ),
    meta: {
      filterVariant: "calendar",
    },
  },
  {
    header: "Location",
    accessorKey: "location",
    id: "location",
    cell: ({ row }) => (
      <div className="max-w-30 flex flex-col ga-1.5">
        <span className="text-xs text-muted-foreground">
          City: <span className="text-foreground">{row.original.city}</span>
        </span>
        <span className="text-xs text-muted-foreground">
          State: <span className="text-foreground">{row.original.state}</span>
        </span>
        <span className="text-xs text-muted-foreground">
          Country:{" "}
          <span className="text-foreground">{row.original.country}</span>
        </span>
      </div>
    ),
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
    ),
    meta: {
      filterVariant: "calendar",
    },
    filterFn: (row, _, value) => {
      if (!value) return true;

      if (
        format(row.original.createdAt, "yyyy-MM-dd") ==
        format(value, "yyyy-MM-dd")
      )
        return true;
      return false;
    },
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {
          <>
            <DeleteJobBtn id={row.original.id} />
            <Button asChild variant={"outline"} size={"icon"}>
              <NavLink to={`update/${row.original.id}`}>
                <PencilIcon />
              </NavLink>
            </Button>
          </>
        }
      </div>
    ),
  },
];

export const ManageAllTravelsPage = () => {
  const canManageJob = useHasRole([ROLES.HR]);
  const { userProfile } = useUser();
  const { createdTravels, isCreatedTravelsLoading } = useTravel();

  let data = createdTravels.filter(
    ({ createdBy }) => createdBy.id === userProfile?.userId,
  );

  if (isCreatedTravelsLoading) return <CustomLoader />;

  if (!canManageJob) emitGoBack("/travels");

  return (
    <div className="flex flex-col items-center gap-2 relative">
      <GoBackBtn to={"/travels"} />
      <div className="flex flex-col gap-3 w-full mt-20">
        <div className="flex items-center justify-between">
          <div className="text-xl font-medium">Manage Travels</div>
          <Button variant={"secondary"} asChild>
            <NavLink to={"create"}>Create Travel</NavLink>
          </Button>
        </div>
        <div className="flex items-center">
          <DataTable
            columns={columns}
            data={data || []}
            filterColumns={["title", "startDate", "endDate"]}
          />
        </div>
        <Outlet context={{ canManageJob }} />
      </div>
    </div>
  );
};
