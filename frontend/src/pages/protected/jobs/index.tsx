import DataTable from "@/components/common/data-table";
import { DeleteDialog } from "@/components/games/dialog/delete-booking-dialog";
import { Button } from "@/components/ui/button";
import { useFetchJobs } from "@/hooks/job/use-fetch-jobs";
import { useJob } from "@/hooks/job/use-job";
import { useHasRole } from "@/hooks/user/use-has-role";
import type { IJob } from "@/lib/types/job";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { NavLink, Outlet } from "react-router";

const columns: ColumnDef<IJob>[] = [
  {
    header: "#Id",
    accessorKey: "id",
    id: "id",
    cell: ({ row }) => <div>{row.original.id}</div>,
    enableSorting: false,
    meta: {
      filterVariant: "select",
      bindLabel: "",
      bindValue: "",
    },
  },
  {
    header: "Title",
    accessorKey: "title",
    id: "title",
    cell: ({ row }) => <div>{row.original.title}</div>,
    enableSorting: false,
  },
  {
    header: "Description",
    accessorKey: "description",
    id: "description",
    cell: ({ row }) => <div>{row.original.description}</div>,
    enableSorting: false,
  },
  {
    header: "HR Email",
    accessorKey: "defaultHrEmail",
    id: "defaultHrEmail",
    cell: ({ row }) => <div>{row.original.defaultHrEmail}</div>,
    enableSorting: false,
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
        {/* <DeleteDialog bookingId={row.original.id} /> */}
      </div>
    ),
    meta: {
      filterVariant: "select",
    },
  },
];

export const JobsPage = () => {
  useFetchJobs();
  const canCreateJob = useHasRole(["hr"]);
  const { jobs } = useJob();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium">All Jobs</div>
        {canCreateJob && (
          <Button variant={"secondary"} asChild>
            <NavLink to={"create"}>Create Job</NavLink>
          </Button>
        )}
      </div>
      <div className="flex items-center">
        {/* Job table here */}
        <DataTable
          columns={columns}
          data={jobs || []}
          filterColumns={["createdAt"]}
        />
      </div>
      <Outlet context={{ canCreateJob }} />
    </div>
  );
};
