import { CustomEmpty } from "@/components/shared/custom-empty";
import { UploadDocumentDialog } from "@/components/travels/documents/upload-document-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchAllTravelDocuments } from "@/hooks/travel/document/use-fetch-travel-documents";
import { useTravel } from "@/hooks/travel/use-travel";
import { useUser } from "@/hooks/user/use-user";
import { ENV } from "@/lib/ENV";
import { emitGoBack } from "@/lib/helpers/events/go-back-event";
import { cn } from "@/lib/utils";
import { DownloadIcon, FileExclamationPoint, FileIcon } from "lucide-react";
import { useState } from "react";
import { NavLink, useParams } from "react-router";

const tabs = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "you",
    label: "Yours",
  },
  {
    key: "hr",
    label: "Added by HR",
  },
] as const;

export const TravelDocuments = () => {
  const { travelId } = useParams();
  const { userProfile } = useUser();
  const { travels, isTravelsLoading } = useTravel();
  const [currentTab, setCurrentTab] = useState<"all" | "you" | "hr">("all");
  const { documents, isPending } = useFetchAllTravelDocuments(travelId);
  const singleTravel = travels.find(({ id }) => id == Number(travelId));

  if (!isTravelsLoading && !singleTravel) {
    emitGoBack("/travels");
    return;
  }

  if (isTravelsLoading) return;

  const data = documents?.filter((ele) => {
    if (currentTab == "you")
      return ele.document.uploadedBy.id === userProfile?.userId;
    if (currentTab == "hr")
      return ele.document.uploadedBy.id !== userProfile?.userId;
    return true;
  });

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Travel :{singleTravel?.title}</CardTitle>
          <CardDescription>{singleTravel?.description}</CardDescription>
        </CardHeader>
      </Card>
      <div className="flex items-center justify-between gap-3 w-full mt-4">
        <div className="text-xl font-medium">Document Gallery</div>
        <div className="flex items-center gap-2 max-sm:hidden">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              size={"sm"}
              variant={"ghost"}
              onClick={() => setCurrentTab(tab.key)}
              className={cn(tab.key === currentTab && "bg-accent text-primary")}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <UploadDocumentDialog travelId={Number(travelId)} />
      </div>
      {isPending &&
        [1, 2, 3, 4].map((ele) => (
          <Skeleton className="h-20 w-full" key={ele} />
        ))}

      {!isPending && data?.length === 0 && (
        <CustomEmpty
          title="No Documents"
          description="There are no documents available here"
          Icon={FileExclamationPoint}
        />
      )}

      {!isPending &&
        data &&
        data.length > 0 &&
        data?.map((doc) => (
          <Item variant={"muted"} key={doc.title}>
            <ItemMedia variant="icon">
              <FileIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{doc.title}</ItemTitle>
              <ItemDescription>
                Added By:{" "}
                <span className="font-medium">
                  {doc.document.uploadedBy.id === userProfile?.userId ? (
                    <span className="text-primary">You</span>
                  ) : (
                    doc.document.uploadedBy.name
                  )}
                </span>
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant={"outline"} size={"sm"}>
                <NavLink
                  to={`${ENV.DOCUMENT_PUBLIC_URL}/${doc.document.filePath}`}
                  target="_blank"
                >
                  View
                </NavLink>
              </Button>
              <Button asChild variant={"outline"} size={"sm"}>
                <NavLink
                  to={`${ENV.DOCUMENT_DOWNLOAD_URL}/${doc.document.filePath}`}
                  target="_blank"
                >
                  <DownloadIcon />
                </NavLink>
              </Button>
            </ItemActions>
          </Item>
        ))}
    </div>
  );
};
