import { getAllJobs } from "@/api/actions/job";
import type { IGame } from "@/lib/types/game";
import { setJobs } from "@/store/slices/job-slice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "../user/use-user";

export const useFetchJobs = () => {
  const dispatch = useDispatch();
  const { userProfile } = useUser();
  const { data: jobs } = useQuery<IGame[]>({
    queryKey: ["all-jobs"],
    queryFn: getAllJobs,
  });

  useEffect(() => {
    if (jobs?.length && jobs?.length > 0) {
      const payload = jobs.map((job) => ({
        ...job,
        userId: userProfile?.userId,
      }));
      dispatch(setJobs([payload]));
    }
  }, [jobs, dispatch]);
};
