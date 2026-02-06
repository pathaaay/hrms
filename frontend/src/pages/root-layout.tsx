import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack-query/query-client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/components/common/theme-provider";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default RootLayout;
