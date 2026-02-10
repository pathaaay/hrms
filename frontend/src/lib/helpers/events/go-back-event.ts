export const GO_BACK_EVENT = "go-back";

export const emitGoBack = (path: string) => {
  globalThis.window.dispatchEvent(
    new CustomEvent(GO_BACK_EVENT, {
      detail: { path },
    }),
  );
};
