import { JobCard } from "@/components/jobs/job-card";
import { Button } from "@/components/ui/button";
import { useJob } from "@/hooks/job/use-job";
import { useHasRole } from "@/hooks/user/use-has-role";
import { NavLink } from "react-router";

export const JobsPage = () => {
  const { jobs } = useJob();
  const canManageJob = useHasRole(["hr"]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium">All Jobs</div>
        {canManageJob && (
          <Button variant={"secondary"} asChild>
            <NavLink to={"manage"}>Manage Jobs</NavLink>
          </Button>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  );
};
