import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack-query/query-client";
import { Provider } from "react-redux";
import { store } from "@/store";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
};

export default RootLayout;
