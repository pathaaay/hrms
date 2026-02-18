import { useFetchOrganizationDataByUserId } from "@/hooks/organization/use-fetch-organization-data";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import React from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { Badge } from "../ui/badge";

export const OrganizationChartData = ({
  userId,
}: {
  userId: number | string;
}) => {
  const { organizationData } = useFetchOrganizationDataByUserId(userId);
  return (
    <div className="p-5 flex flex-col-reverse gap-2 w-full">
      {organizationData?.map((user, i) => (
        <React.Fragment key={user.userId}>
          <NavLink to={`/organization-chart/${user.userId}`}>
            <Item
              variant={userId === user.userId ? "outline" : "muted"}
              className={cn(userId == user.userId && "border-primary")}
            >
              <ItemMedia>
                <Avatar className="size-10">
                  <AvatarImage src={user.avatarPathSrc} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  {user.name}
                  <Badge variant={"secondary"} className="text-xs capitalize">
                    {user.role}
                  </Badge>
                </ItemTitle>
                <ItemDescription>{user.email}</ItemDescription>
                <ItemDescription>DOB: {new Date(user.dateOfBirth).toLocaleDateString()}</ItemDescription>
                <ItemDescription>DOJ: {new Date(user.dateOfBirth).toLocaleDateString()}</ItemDescription>
              </ItemContent>
            </Item>
          </NavLink>
          {i + 1 !== organizationData.length && (
            <Separator
              orientation={"vertical"}
              className="h-10! mx-auto bg-primary"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
