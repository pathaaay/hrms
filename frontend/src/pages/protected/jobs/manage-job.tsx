import { ManageJobForm } from "@/components/forms/jobs/manage-job-form";
import { Dialog } from "@/components/ui/dialog";
import { useHasRole } from "@/hooks/user/use-has-role";
import { useUser } from "@/hooks/user/use-user";
import { emitGoBack } from "@/lib/helpers/events/go-back-event";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const ManageJob = () => {
  const canCreateJob = useHasRole(["hr"]);
  const { isAuthenticated } = useUser();
  const [open, setOpen] = useState(true);
  const { jobId } = useParams();

  useEffect(() => {
    if (isAuthenticated && !canCreateJob) {
      emitGoBack("/jobs");
    }
  }, [isAuthenticated, canCreateJob]);

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
