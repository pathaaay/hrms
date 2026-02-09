import UpdateInterestedGames from "@/components/forms/user/update-interested-games";
import { CardContentRow } from "@/components/shared/card-content-row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useFetchGames } from "@/hooks/game/use-fetch-games";
import { useUser } from "@/hooks/user/use-user";
import { EditIcon } from "lucide-react";

const profileContents = [
  {
    label: "Role",
    key: "role",
  },
  {
    label: "Department",
    key: "department",
  },
  {
    label: "City",
    key: "city",
  },
  {
    label: "State",
    key: "state",
  },
  {
    label: "Timezone",
    key: "timezone",
  },
] as const;

export const AccountPage = () => {
  useFetchGames();
  
  const { userProfile } = useUser();
  if (!userProfile) return;

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-muted w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-start gap-3 items-center">
          <Avatar className="size-12 rounded-lg">
            <AvatarImage
              src={userProfile?.avatarPathSrc}
              alt={userProfile?.name}
            />
            <AvatarFallback className="rounded-lg">
              {userProfile?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">{userProfile.name}</div>
            <div className="text-sm text-muted-foreground">
              {userProfile.email}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        {profileContents.map((content) => (
          <CardContentRow
            key={content.key}
            label={content.label}
            value={userProfile[content?.key]}
          />
        ))}
        <CardContentRow
          label="Date of Birth"
          value={new Date(userProfile.dateOfBirth).toLocaleDateString()}
        />
        <CardContentRow
          label="Date of Joining"
          value={new Date(userProfile.dateOfJoining).toLocaleDateString()}
        />
        <Separator />
        <UpdateInterestedGames />
      </CardContent>
    </Card>
  );
};
