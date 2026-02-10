import { apiService } from "@/lib/axios";
import type { JobSchemaType } from "@/lib/schemas/job-schema";

const JOBS_ENDPOINT = "/jobs";

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
