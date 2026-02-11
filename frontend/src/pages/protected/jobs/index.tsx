import { JobCard } from "@/components/jobs/job-card";
import { CustomEmpty } from "@/components/shared/custom-empty";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJob } from "@/hooks/job/use-job";
import { useHasRole } from "@/hooks/user/use-has-role";
import { NavLink } from "react-router";

export const JobsPage = () => {
  const { jobs, isLoading } = useJob();
  const canManageJob = useHasRole(["hr"]);

  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium">All Jobs</div>
        {canManageJob && (
          <Button variant={"secondary"} asChild>
            <NavLink to={"manage"}>Manage Jobs</NavLink>
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((ele) => (
            <Skeleton key={ele} className="h-60 w-full" />
          ))}
        </div>
      )}

      {!isLoading && jobs.length === 0 && (
        <CustomEmpty
          title="No jobs"
          description="There are no jobs available for now"
        />
      )}

      {jobs.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      )}
    </div>
  );
};
