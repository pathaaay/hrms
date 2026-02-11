import { useFetchJobs } from "@/hooks/job/use-fetch-jobs";
import { Outlet } from "react-router";

export const JobLayout = () => {
  useFetchJobs();
  return <Outlet />;
};
