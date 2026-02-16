import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { BriefcaseBusinessIcon, FileTextIcon, UserIcon } from "lucide-react";
import { NavLink } from "react-router";
import { CardContentRow } from "../shared/card-content-row";
import { cn } from "@/lib/utils";
import type { IJob } from "@/lib/types/job";
import { ENV } from "@/lib/ENV";
import { ReferByEmailsDialogForm } from "./refer-email-dialog-form";
import { ReferFriendDialogForm } from "./refer-friend-dialog-form";

interface JobCardProps {
  job: IJob;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card
      className={cn(
        "rounded-2xl h-max shadow-md hover:shadow-xl transition-all duration-300 border-muted hover:scale-[1.01]",
      )}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BriefcaseBusinessIcon />
            <span className="text-xl font-semibold">{job.title}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <CardContentRow
          Icon={UserIcon}
          label={"Created By"}
          value={job.createdBy.name}
        />
        <CardContentRow
          Icon={FileTextIcon}
          label={"JD document"}
          value={
            <Button
              variant={"secondary"}
              size={"sm"}
              asChild
              className="flex text-xs flex-col text-muted-foreground"
            >
              <NavLink
                to={`${ENV.DOCUMENT_PUBLIC_URL}/${job.jdFilePath}`}
                target="_blank"
              >
                View
              </NavLink>
            </Button>
          }
        />
      </CardContent>
      <CardFooter className="flex items-center gap-1">
        <ReferFriendDialogForm jobId={job.id} />
        <ReferByEmailsDialogForm jobId={job.id} />
      </CardFooter>
    </Card>
  );
};
