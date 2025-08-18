import { createHashRouter, Outlet } from "react-router-dom";

// import Canvas from "@/components/custom/canvas/Canvas";
// import StudyPage from "@/features/flashcards/components/study-page/StudyPage";
// import {
//   DeckDetails,
//   deckLoader,
// } from "@/features/flashcards/components/deck-details/DeckDetails";
import MainLayout from "./layout/MainLayout";
import { type BreadcrumbHandle } from "./types";
// import Gallery from "@/features/gallery/components/Gallery";
// import Calendar from "@/features/planner/components/calendar/Calendar";
import FlashCardsPage from "./layout/FlashCardsPage";
import FlashCardsLayout from "@/features/flashcards/FlashCardsLayout";
import PageWrapper from "@/components/mycomponents/custom/page/PageWrapper";
import Calendar from "@/features/planner/components/calendar/Calendar";
// import { QueryClient } from "@tanstack/react-query";
// import Gallery from "@/features/gallery/Gallery";
// import SpinePlayer from "@/features/spine/SpinePlayer";

// const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "flashcards",
        element: <FlashCardsLayout />,
        handle: {
          breadcrumb: "Flashcards",
        } satisfies BreadcrumbHandle,
        children: [
          {
            index: true,
            element: <FlashCardsPage />,
          },
          // {
          //   path: ":id",
          //   children: [
          //     {
          //       index: true,
          //       element: <DeckDetails />,
          //       loader: deckLoader(queryClient),
          //       handle: {
          //         breadcrumbFn: (
          //           match: UIMatch<
          //             Awaited<ReturnType<ReturnType<typeof deckLoader>>>
          //           >
          //         ) => {
          //           const deck = match.data.deck;
          //           return deck.name;
          //         },
          //       },
          //     },
          //     {
          //       path: "study",
          //       element: <StudyPage />,
          //       handle: {
          //         breadcrumb: "Study",
          //       } satisfies BreadcrumbHandle,
          //     },
          //   ],
          // },
        ],
      },
      {
        path: "planner",
        element: <Calendar />,
      },
      {
        path: "documents",
        element: <Outlet />,
        children: [
          {
            path: ":id",
            element: <PageWrapper />,
          },
        ],
      },
    ],
  },
]);

export default router;
