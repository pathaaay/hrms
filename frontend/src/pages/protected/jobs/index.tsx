import { Button } from "@/components/ui/button";
import { NavLink, useOutletContext } from "react-router";

export const JobsPage = () => {
  const { canCreateJob } = useOutletContext<{ canCreateJob: boolean }>();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium">All Games</div>
        {canCreateJob && (
          <Button variant={"secondary"} asChild>
            <NavLink to={"create"}>Create Job</NavLink>
          </Button>
        )}
      </div>
      <div className="grid md:frid-cols-2 lg:grid-cols-3 gap-6">
        {/* Job table here */}
      </div>
    </div>
  );
};
