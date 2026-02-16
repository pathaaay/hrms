import { ManageJobForm } from "@/components/forms/jobs/manage-job-form";
import { Dialog } from "@/components/ui/dialog";
import { useHasRole } from "@/hooks/user/use-has-role";
import { useUser } from "@/hooks/user/use-user";
import { emitGoBack } from "@/lib/helpers/events/go-back-event";
import { ROLES } from "@/lib/types/user";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const ManageSingleJob = () => {
  const canManageJob = useHasRole([ROLES.HR]);
  const { isAuthenticated } = useUser();
  const [open, setOpen] = useState(true);
  const { jobId } = useParams();

  useEffect(() => {
    if (isAuthenticated && !canManageJob) {
      emitGoBack("/jobs");
    }
  }, [isAuthenticated, canManageJob]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        emitGoBack("/jobs");
      }, 200);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ManageJobForm jobId={jobId} />
    </Dialog>
  );
};
