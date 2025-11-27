import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Highlight {
  content: string;
}

interface PdfReaderState {
  highlights: Record<string, Highlight[]>;

  setHighlights: (highlight: Highlight, pageNumber: string) => void;
}

const usePdfReaderStore = create<PdfReaderState>()(
  persist(
    (set) => ({
      highlights: {},

      setHighlights: (highlight, pageNumber) =>
        set((state) => ({
          highlights: {
            ...state.highlights,
            [pageNumber]: [...state.highlights[pageNumber], highlight],
          },
        })),
    }),
    { name: "pdf-reader-store" },
  ),
);

export default usePdfReaderStore;
