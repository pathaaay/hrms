import { CustomEmpty } from "@/components/shared/custom-empty";
import { DeleteTravelDocumentBtn } from "@/components/travels/documents/delete-travel-document-btn";
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
import { cn, convertToPublicUrl } from "@/lib/utils";
import { DownloadIcon, FileExclamationPoint, FileIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
] as const;

export const TravelDocuments = ({ manage }: { manage?: boolean }) => {
  const { travelId } = useParams();
  const { userProfile } = useUser();
  const [currentTab, setCurrentTab] = useState<"all" | "you" | "hr">("all");

  const { travels, createdTravels, isCreatedTravelsLoading, isTravelsLoading } =
    useTravel();

  const singleTravel = manage
    ? createdTravels.find(({ id }) => id == Number(travelId))
    : travels.find(({ id }) => id == Number(travelId));

  const { documents, isPending } = useFetchAllTravelDocuments(
    singleTravel?.id.toString(),
  );

  useEffect(() => {
    if (!isCreatedTravelsLoading && !isTravelsLoading && !singleTravel) {
      emitGoBack("/travels");
    }
  }, [isTravelsLoading, singleTravel, isCreatedTravelsLoading]);

  if (isTravelsLoading || isCreatedTravelsLoading) return;

  const data = documents?.filter((ele) => {
    if (currentTab == "you")
      return (
        ele.document.uploadedBy.id === userProfile?.userId &&
        (manage ||
          !ele?.addedFor?.id ||
          ele?.addedFor?.id === userProfile.userId)
      );
    return (
      manage || !ele?.addedFor?.id || ele?.addedFor?.id === userProfile?.userId
    );
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
        {!manage && (
          <div className="flex items-center gap-2 max-sm:hidden">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                size={"sm"}
                variant={"ghost"}
                onClick={() => setCurrentTab(tab.key)}
                className={cn(
                  tab.key === currentTab && "bg-accent text-primary",
                )}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        )}
        <UploadDocumentDialog
          showAddedFor={manage}
          users={manage ? singleTravel?.travelMembers : []}
          travelId={Number(travelId)}
        />
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
        data?.map((ele) => (
          <Item variant={"muted"} key={ele.id}>
            <ItemMedia variant="icon">
              <FileIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{ele.title}</ItemTitle>
              <ItemDescription className="flex flex-col gap-0.5">
                <span>
                  Added By:{" "}
                  <span className="font-medium">
                    {ele.document.uploadedBy.id === userProfile?.userId ? (
                      <span className="text-primary">You</span>
                    ) : (
                      ele.document.uploadedBy.name
                    )}
                  </span>
                </span>
                {manage && (
                  <span>
                    Added For:{" "}
                    <span className="font-medium">
                      {ele.addedFor?.name ||
                        (ele.document.uploadedBy.id === userProfile?.userId
                          ? "Everyone"
                          : "-")}
                    </span>
                  </span>
                )}
                <span>
                  Added On:{" "}
                  <span className="font-medium">
                    {new Date(ele.createdAt).toLocaleDateString()}
                  </span>
                </span>
                <span>
                  File Type:{" "}
                  <span className="font-medium">
                    {ele.document.fileType || "-"}
                  </span>
                </span>
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              {ele.document.uploadedBy.id === userProfile?.userId && (
                <DeleteTravelDocumentBtn
                  travelId={Number(travelId)}
                  id={ele.id}
                />
              )}
              <Button variant={"outline"} size={"sm"}>
                <NavLink
                  to={convertToPublicUrl(ele.document.filePath)}
                  target="_blank"
                >
                  View
                </NavLink>
              </Button>
              <Button asChild variant={"outline"} size={"sm"}>
                <NavLink
                  to={`${ENV.DOCUMENT_DOWNLOAD_URL}/${ele.document.filePath}`}
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
