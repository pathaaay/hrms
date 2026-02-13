import { getAllJobs } from "@/api/actions/job";
import { setJobs } from "@/store/slices/job-slice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { IJob } from "@/lib/types/job";

export const useFetchJobs = () => {
  const dispatch = useDispatch();
  const { data: jobs } = useQuery<IJob[]>({
    queryKey: ["all-jobs"],
    queryFn: getAllJobs,
  });

  useEffect(() => {
    if (jobs) {
      const payload = jobs.map((job) => ({
        ...job,
      }));
      dispatch(setJobs(payload));
    }
  }, [jobs, dispatch]);
};
