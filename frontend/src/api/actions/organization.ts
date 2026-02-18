import { apiService } from "@/lib/axios";

const ORGANIZATIONS_ENDPOINT = "/organization";

export const getAllOrganizationDataByUserId = async (
  userId: number | string,
) => {
  const res = await apiService.get(`${ORGANIZATIONS_ENDPOINT}/chart/${userId}`);
  return res.data;
};
