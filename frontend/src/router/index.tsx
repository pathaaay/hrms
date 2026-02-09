import { createBrowserRouter } from "react-router";
import RootLayout from "@/pages/root-layout.tsx";
import AuthLayout from "@/pages/auth/auth-layout.tsx";
import LoginPage from "@/pages/auth/login-page.tsx";
import NotFoundPage from "@/components/common/not-found.tsx";
import ProtectedLayout from "@/pages/protected/protected-layout.tsx";
import { DashboardPage } from "@/pages/protected/index.tsx";
import { AccountPage } from "@/pages/protected/account/index.tsx";
import { GamesPage } from "@/pages/protected/games/index.tsx";
import { TravelPage } from "@/pages/protected/travel/index.tsx";
import { JobsPage } from "@/pages/protected/jobs/index.tsx";
import { InternalServerErrorPage } from "@/components/common/internal-server-error";
import { GameLayout } from "@/pages/protected/games/game-layout";
import { SingleGamePage } from "@/pages/protected/games/single-game";
import BookGame from "@/pages/protected/games/single-game/book-game";
import { UserGameBookingPage } from "@/pages/protected/games/bookings";

export const appRouter = createBrowserRouter([
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
            path: "/account",
            element: <AccountPage />,
          },
          {
            path: "games",
            element: <GameLayout />,
            children: [
              {
                index: true,
                element: <GamesPage />,
              },
              {
                path: ":gameId",
                element: <SingleGamePage />,
                children: [
                  {
                    path: "book-slot",
                    element: <BookGame />,
                  },
                ],
              },
              {
                path: "bookings",
                element: <UserGameBookingPage />,
              },
            ],
          },
          {
            path: "/travel",
            element: <TravelPage />,
          },
          {
            path: "/jobs",
            element: <JobsPage />,
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
      { path: "server-error", element: <InternalServerErrorPage /> },
    ],
  },
]);
