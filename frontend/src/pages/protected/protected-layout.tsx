import { fetchUser } from "@/api/queries/user";
import { Outlet } from "react-router";

const ProtectedLayout = () => {
  const { data, isFetching } = fetchUser();

  return (
    <>
      <Outlet context={{ data, isFetching }} />
    </>
  );
};

export default ProtectedLayout;
