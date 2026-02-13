import { useToggleJobMutation } from "@/api/mutations/job";
import { CustomLoader } from "@/components/common/custol-loader";
import DataTable from "@/components/common/data-table";
import { DeleteJobBtn } from "@/components/jobs/delete-job-btn";
import { GoBackBtn } from "@/components/shared/go-back-btn";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useJob } from "@/hooks/job/use-job";
import { useHasRole } from "@/hooks/user/use-has-role";
import { useUser } from "@/hooks/user/use-user";
import { ENV } from "@/lib/ENV";
import { emitGoBack } from "@/lib/helpers/events/go-back-event";
import type { IJob } from "@/lib/types/job";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import { NavLink, Outlet } from "react-router";

let columns: ColumnDef<IJob>[] = [
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
    header: "HR Email",
    accessorKey: "defaultHrEmail",
    id: "defaultHrEmail",
    cell: ({ row }) => (
      <div
        className="text-sm overflow-hidden text-ellipsis max-w-30"
        title={row.original.defaultHrEmail}
      >
        {row.original.defaultHrEmail}
      </div>
    ),
  },
  {
    header: "Active",
    accessorKey: "isActive",
    id: "isActive",
    cell: ({ row }) => (
      <div className="flex text-xs flex-col text-muted-foreground">
        <ToggleJobSwitch
          jobId={row.original.id}
          value={row.original.isActive}
        />
      </div>
    ),
  },
  {
    header: "JD Document",
    accessorKey: "JD",
    cell: ({ row }) => (
      <Button
        variant={"secondary"}
        size={"xs"}
        asChild
        className="flex text-xs flex-col text-muted-foreground"
      >
        <NavLink
          to={`${ENV.DOCUMENT_PUBLIC_URL}/${row.original.jdFilePath}`}
          target="_blank"
        >
          View
        </NavLink>
      </Button>
    ),
    meta: {
      filterVariant: "select",
    },
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
        {row.original.userId === row.original.createdBy.id ? (
          <>
            <DeleteJobBtn id={row.original.id} />
            <Button asChild variant={"outline"} size={"icon"}>
              <NavLink to={`update/${row.original.id}`}>
                <PencilIcon />
              </NavLink>
            </Button>
          </>
        ) : (
          <div className="text-xs text-muted-foreground">Not allowed</div>
        )}
      </div>
    ),
  },
];

export const ManageAllJobsPage = () => {
  const canManageJob = useHasRole(["hr"]);
  const { userProfile } = useUser();
  const { jobs, isLoading } = useJob();
  let data = jobs.filter(
    ({ createdBy }) => createdBy.id === userProfile?.userId,
  );

  if (isLoading) return <CustomLoader />;

  if (!canManageJob) emitGoBack("/jobs");

  return (
    <div className="flex flex-col items-center gap-2 relative">
      <GoBackBtn to={"/jobs"} />
      <div className="flex flex-col gap-3 w-full mt-20">
        <div className="flex items-center justify-between">
          <div className="text-xl font-medium">Jobs</div>
          <Button variant={"secondary"} asChild>
            <NavLink to={"create"}>Create Job</NavLink>
          </Button>
        </div>
        <div className="flex items-center">
          {/* Job table here */}
          <DataTable
            columns={columns}
            data={data || []}
            filterColumns={["title", "createdAt"]}
          />
        </div>
        <Outlet context={{ canManageJob }} />
      </div>
    </div>
  );
};

const ToggleJobSwitch = ({
  jobId,
  value,
}: {
  jobId: number;
  value: boolean;
}) => {
  const { mutate: toggleJob } = useToggleJobMutation();
  return <Switch checked={value} onCheckedChange={() => toggleJob(jobId)} />;
};
