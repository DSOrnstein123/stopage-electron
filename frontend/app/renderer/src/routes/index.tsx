import { createHashRouter } from "react-router-dom";

// import Canvas from "@/components/custom/canvas/Canvas";
import Flashcards from "@/components/mycomponents/custom/page/Flashcards";
// import StudyPage from "@/features/flashcards/components/study-page/StudyPage";
// import {
//   DeckDetails,
//   deckLoader,
// } from "@/features/flashcards/components/deck-details/DeckDetails";
import FlashCardsLayout from "./layout/FlashCardsLayout";
import MainLayout from "./layout/MainLayout";
import { type BreadcrumbHandle } from "./types";
// import { QueryClient } from "@tanstack/react-query";
// import Gallery from "@/features/gallery/Gallery";
// import TextEditor from "@/components/mycomponents/tiptap/TextEditor";
// import SpinePlayer from "@/features/spine/SpinePlayer";

// const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "flashcards",
        element: <Flashcards />,
        handle: {
          breadcrumb: "Flashcards",
        } satisfies BreadcrumbHandle,
        children: [
          {
            index: true,
            element: <FlashCardsLayout />,
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
      // {
      //   path: "gallery",
      //   element: <SpinePlayer />,
      // },
    ],
  },
]);

export default router;
