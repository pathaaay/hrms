import { OrganizationChartData } from "@/components/organization/organization-chart-data";
import { SearchUserSelectBox } from "@/components/organization/search-user-select-box";
import { useUser } from "@/hooks/user/use-user";
import { useParams } from "react-router";

export const OrganizationChartPage = () => {
  const { userId } = useParams();
  const { userProfile, isAuthenticated } = useUser();
  if (!isAuthenticated || !userProfile) return;

  return (
    <div className="p-5 flex flex-col gap-2 max-w-sm w-full mx-auto">
      <SearchUserSelectBox />
      <OrganizationChartData userId={userId || userProfile.userId} />
    </div>
  );
};
