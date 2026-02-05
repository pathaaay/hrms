import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default RootLayout;
