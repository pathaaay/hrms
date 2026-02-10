import { useEffect } from "react";
import { useNavigate } from "react-router";
import { REDIRECT_EVENT } from "@/lib/helpers/events/redirect-event";
import { GO_BACK_EVENT } from "@/lib/helpers/events/go-back-event";

export const useNavigationEffect = () => {
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

  useEffect(() => {
    const handleGoBack = (event: Event) => {
      const customEvent = event as CustomEvent<{ path: string }>;
      const path = customEvent?.detail?.path;

      if (
        globalThis.window &&
        globalThis.window.history.state &&
        globalThis.window.history.state.idx > 0
      )
        navigate(-1);
      else navigate(path, { replace: true });
    };
    globalThis.window.addEventListener(GO_BACK_EVENT, handleGoBack);

    return () => {
      globalThis.window.removeEventListener(GO_BACK_EVENT, handleGoBack);
    };
  }, [navigate]);
};
