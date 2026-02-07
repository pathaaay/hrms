export const REDIRECT_EVENT = "custom-redirect";

export const emitCustomRedirect = (path: string) => {
  globalThis.window.dispatchEvent(
    new CustomEvent(REDIRECT_EVENT, {
      detail: { path },
    }),
  );
};
