import { useFetchOrganizationDataByUserId } from "@/hooks/organization/use-fetch-organization-data";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import React from "react";
import { Separator } from "../ui/separator";
import { cn, convertToPublicUrl } from "@/lib/utils";
import { NavLink } from "react-router";
import { Badge } from "../ui/badge";
import type { IUserProfile } from "@/lib/types/user";

export const OrganizationChartData = ({
  userId,
}: {
  userId: number | string;
}) => {
  const { managerialData, directReports } =
    useFetchOrganizationDataByUserId(userId);
  const singleUser = managerialData?.find(
    ({ userId }) => userId === Number(userId),
  );

  return (
    <div className="w-full">
      <div className="max-w-sm mx-auto flex flex-col-reverse">
        {managerialData?.map((user, i) => (
          <React.Fragment key={user.userId}>
            {
              <Separator
                orientation={"vertical"}
                className={cn(
                  "h-10! mx-auto bg-primary",
                  !directReports?.length && i == 0 && "hidden",
                )}
              />
            }
            <UserCard user={user} userId={userId} />
          </React.Fragment>
        ))}
      </div>
      {directReports && directReports?.length > 0 && (
        <>
          <div className="text-center bg-secondary rounded-md w-max mx-auto p-1 px-2 text-sm">
            People reporting to {singleUser?.name}
          </div>
          <Separator
            orientation={"vertical"}
            className={cn("h-10! mx-auto bg-primary")}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border w-full gap-2 p-3 rounded-md">
            {directReports?.map((user) => (
              <UserCard user={user} userId={userId} key={user.userId} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const UserCard = ({
  user,
  userId,
}: {
  user: IUserProfile;
  userId: string | number;
}) => {
  return (
    <NavLink to={`/organization-chart/${user.userId}`} replace>
      <Item
        variant={userId === user.userId ? "outline" : "muted"}
        className={cn(
          `shadow-md hover:border-primary/30`,
          userId == user.userId && "border-primary hover:border-primary",
        )}
      >
        <ItemMedia>
          <Avatar className="size-10">
            <AvatarImage src={convertToPublicUrl(user.avatarFilePath)} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="w-full">
            {user.name}
            <Badge variant={"secondary"} className="text-xs capitalize ml-auto">
              {user.role}
            </Badge>
          </ItemTitle>
          <ItemDescription>{user.email}</ItemDescription>
        </ItemContent>
      </Item>
    </NavLink>
  );
};
