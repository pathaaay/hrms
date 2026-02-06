import { fetchUser } from "@/api/queries/user";
import { Navbar } from "@/components/common/navbar";
import { Outlet } from "react-router";

const ProtectedLayout = () => {
  const { data, isFetching } = fetchUser();


  return (
    <>
      <Navbar userProfile={data} />
      <Outlet context={{ data, isFetching }} />
    </>
  );
};

export default ProtectedLayout;
