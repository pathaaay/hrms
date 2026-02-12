import { getAllJobs } from "@/api/actions/job";
import { setJobs } from "@/store/slices/job-slice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "../user/use-user";
import type { IJob } from "@/lib/types/job";

export const useFetchJobs = () => {
  const dispatch = useDispatch();
  const { userProfile } = useUser();
  const { data: jobs } = useQuery<IJob[]>({
    queryKey: ["all-jobs"],
    queryFn: getAllJobs,
  });

  useEffect(() => {
    if (jobs) {
      const payload = jobs.map((job) => ({
        ...job,
        userId: userProfile?.userId,
      }));
      dispatch(setJobs(payload));
    }
  }, [jobs, dispatch]);
};
