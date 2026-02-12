import { apiService } from "@/lib/axios";
import type {
  JobSchemaType,
  ReferFriendByEmailsSchemaType,
  ReferFriendSchemaType,
} from "@/lib/schemas/job-schema";

const JOBS_ENDPOINT = "/jobs";

export const getAllJobs = async () => {
  const res = await apiService.get(JOBS_ENDPOINT);
  return res.data;
};

export const createJob = async (values: JobSchemaType) => {
  const res = await apiService.post(JOBS_ENDPOINT, {
    ...values,
  });
  return res.data;
};

export const updateJob = async (values: JobSchemaType & { jobId: string }) => {
  const res = await apiService.put(`${JOBS_ENDPOINT}/${values.jobId}`, {
    ...values,
  });
  return res.data;
};

export const deleteJob = async (jobId: number) => {
  const res = await apiService.delete(`${JOBS_ENDPOINT}/${jobId}`);
  return res.data;
};

export const toggleJob = async (jobId: number) => {
  const res = await apiService.patch(`${JOBS_ENDPOINT}/${jobId}/toggle`);
  return res.data;
};

export const referFriendByEmails = async (
  data: ReferFriendByEmailsSchemaType,
) => {
  const emails = data.emails.map(({ email }) => email);

  const res = await apiService.post(
    `${JOBS_ENDPOINT}/${data.jobId}/refer-by-emails`,
    {
      emails,
    },
  );
  return res.data;
};

export const createJobReferral = async (values: ReferFriendSchemaType) => {
  const res = await apiService.post(`${JOBS_ENDPOINT}/${values.jobId}/refer-friend`, {
    ...values,
  });
  return res.data;
};
