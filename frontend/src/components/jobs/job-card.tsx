import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  BriefcaseBusinessIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  LinkIcon,
  UserIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import { CardContentRow } from "../shared/card-content-row";
import { cn } from "@/lib/utils";
import type { IJob } from "@/lib/types/job";
import { ENV } from "@/lib/ENV";
import { CopyToClipboardButton } from "../ui/copy-to-clipboard";
import { useUser } from "@/hooks/user/use-user";
import toast from "react-hot-toast";

interface JobCardProps {
  job: IJob;
}

export const JobCard = ({ job }: JobCardProps) => {
  const { userProfile } = useUser();
  const code =
    userProfile &&
    userProfile?.userId +
      userProfile?.name?.slice(0, 2) +
      userProfile?.email?.slice(0, 2);

  const referLink = `${globalThis.window.location.href}/${job.id}/apply?code=${code}`;

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
      </CardContent>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
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
        <CopyToClipboardButton
          text={referLink}
          onCopy={() => toast.success("Referral link copied to clipboard!")}
          btnText={<LinkIcon />}
          btnTextCopied={<ClipboardCheckIcon />}
        />
        <Button className="rounded-xl flex-1" variant={"default"}>
          Refer a friend
        </Button>
      </CardFooter>
    </Card>
  );
};
