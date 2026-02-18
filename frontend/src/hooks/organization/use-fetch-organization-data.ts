import { useQuery } from "@tanstack/react-query";
import type { IUserProfile } from "@/lib/types/user";
import { getAllOrganizationDataByUserId } from "@/api/actions/organization";

export const useFetchOrganizationDataByUserId = (userId: string | number) => {
  const { data: organizationData, isPending } = useQuery<IUserProfile[]>({
    queryKey: [`organization-data-user-${userId}`],
    queryFn: () => getAllOrganizationDataByUserId(userId),
  });
  return { isPending, organizationData: organizationData };
};
