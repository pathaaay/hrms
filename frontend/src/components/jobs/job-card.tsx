import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { BriefcaseBusinessIcon, ClockIcon, UsersIcon } from "lucide-react";
import { NavLink } from "react-router";
import { CardContentRow } from "../shared/card-content-row";
import { cn } from "@/lib/utils";
import type { IJob } from "@/lib/types/job";
import { ENV } from "@/lib/ENV";

interface JobCardProps {
  job: IJob;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card
      className={cn(
        "rounded-2xl h-max shadow-md hover:shadow-xl transition-all duration-300 border-muted",
      )}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BriefcaseBusinessIcon />
            <span className="text-xl font-semibold">{job.title}</span>
          </div>
          <Badge variant={"secondary"} className="flex items-center gap-1">
            <ClockIcon className="size-3!" />
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <CardContentRow
          Icon={UsersIcon}
          label={"Created By"}
          value={job.createdBy.name}
        />
      </CardContent>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <CardContentRow
          Icon={UsersIcon}
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
        <Button className="rounded-xl flex-1" asChild>
          <NavLink to={`/jobs/${job.id}`}>Share Job</NavLink>
        </Button>
      </CardFooter>
    </Card>
  );
};
