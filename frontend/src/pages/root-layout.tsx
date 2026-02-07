import { Outlet, useNavigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack-query/query-client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/components/common/theme-provider";
import { useEffect } from "react";
import { REDIRECT_EVENT } from "@/lib/helpers/events/redirect-event";

const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = (event: Event) => {
      const customEvent = event as CustomEvent<{ path: string }>;
      const path = customEvent?.detail?.path;
      if (path) {
        navigate(path);
      }
    };

    globalThis.window.addEventListener(REDIRECT_EVENT, handleRedirect);

    return () => {
      globalThis.window.removeEventListener(REDIRECT_EVENT, handleRedirect);
    };
  }, [navigate]);

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
