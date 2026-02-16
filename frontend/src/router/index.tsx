import { createBrowserRouter } from "react-router";
import RootLayout from "@/pages/root-layout.tsx";
import AuthLayout from "@/pages/auth/auth-layout.tsx";
import LoginPage from "@/pages/auth/login-page.tsx";
import NotFoundPage from "@/components/common/not-found.tsx";
import ProtectedLayout from "@/pages/protected/protected-layout.tsx";
import { DashboardPage } from "@/pages/protected/index.tsx";
import { AccountPage } from "@/pages/protected/account/index.tsx";
import { GamesPage } from "@/pages/protected/games/index.tsx";
import { TravelPage } from "@/pages/protected/travels";
import { JobsPage } from "@/pages/protected/jobs/index.tsx";
import { InternalServerErrorPage } from "@/components/common/internal-server-error";
import { GameLayout } from "@/pages/protected/games/game-layout";
import { SingleGamePage } from "@/pages/protected/games/single-game";
import BookGame from "@/pages/protected/games/single-game/book-game";
import { UserGameBookingPage } from "@/pages/protected/games/bookings";
import { ManageAllJobsPage } from "@/pages/protected/jobs/manage-all-jobs";
import { ManageSingleJob } from "@/pages/protected/jobs/manage-single-job";
import { JobLayout } from "@/pages/protected/jobs/job-layout";
import { MyReferrals } from "@/pages/protected/jobs/referrals/my-referrals";
import { AssignedReferrals } from "@/pages/protected/jobs/referrals/assigned-referrals";
import { ManageAllTravelsPage } from "@/pages/protected/travels/manage/manage-travel";
import { TravelsLayout } from "@/pages/protected/travels/travel-layout";
import { TravelDocuments } from "@/pages/protected/travels/documents/travel-documents";
import { TravelExpenses } from "@/pages/protected/travels/expenses/travel-expenses";
import { CreateTravelPage } from "@/pages/protected/travels/manage/create-travel";
import { ManageTravelLayout } from "@/pages/protected/travels/manage/manage-travel-layout";

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
            path: "travels",
            element: <TravelsLayout />,
            children: [
              {
                index: true,
                element: <TravelPage />,
              },
              {
                path: "manage",
                element: <ManageTravelLayout />,
                children: [
                  {
                    index: true,
                    element: <ManageAllTravelsPage />,
                  },
                  {
                    path: "create",
                    element: <CreateTravelPage />,
                  },
                ],
              },
              {
                path: ":travelId/documents",
                element: <TravelDocuments />,
              },
              {
                path: ":travelId/expenses",
                element: <TravelExpenses />,
              },
            ],
          },
          {
            path: "jobs",
            element: <JobLayout />,
            children: [
              {
                index: true,
                element: <JobsPage />,
              },
              {
                path: "manage",
                element: <ManageAllJobsPage />,
                children: [
                  {
                    path: "create",
                    element: <ManageSingleJob />,
                  },
                  {
                    path: "update/:jobId",
                    element: <ManageSingleJob />,
                  },
                ],
              },
              {
                path: "referrals",
                element: <MyReferrals />,
              },
              {
                path: "assigned-referrals",
                element: <AssignedReferrals />,
              },
            ],
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
