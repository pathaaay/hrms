import { OrganizationChartData } from "@/components/organization/organization-chart-data";
import { useUser } from "@/hooks/user/use-user";
import { useParams } from "react-router";

export const OrganizationChartPage = () => {
  const {userId} = useParams();
  const { userProfile, isAuthenticated } = useUser();
  if (!isAuthenticated || !userProfile) return;

  return (
    <div>
      <OrganizationChartData userId={userId || userProfile.userId} />
    </div>
  );
};
