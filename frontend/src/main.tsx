import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./pages/root-layout.tsx";
import AuthLayout from "./pages/auth/auth-layout.tsx";
import LoginPage from "./pages/auth/login-page.tsx";
import NotFoundPage from "./components/common/not-found.tsx";
import ProtectedLayout from "./pages/protected/protected-layout.tsx";
import { DashboardPage } from "./pages/protected/index.tsx";
import { ProfilePage } from "./pages/protected/profile/index.tsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
