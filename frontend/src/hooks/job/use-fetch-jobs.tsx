import { getAllJobs } from "@/api/actions/job";
import type { IGame } from "@/lib/types/game";
import { setJobs } from "@/store/slices/job-slice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchJobs = () => {
  const dispatch = useDispatch();

  const { data: jobs } = useQuery<IGame[]>({
    queryKey: ["all-jobs"],
    queryFn: getAllJobs,
  });

  useEffect(() => {
    if (jobs?.length && jobs?.length > 0) dispatch(setJobs(jobs));
    return () => {};
  }, [jobs, dispatch]);
};
