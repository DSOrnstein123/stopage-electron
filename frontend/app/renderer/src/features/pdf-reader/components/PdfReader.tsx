import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  GlobalWorkerOptions,
  getDocument,
  type PDFDocumentProxy,
} from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?worker";
import ToolBar from "./toolbar/ToolBar";
import PdfPage from "./PdfPage";

GlobalWorkerOptions.workerPort = new pdfWorker();

const PdfReader = () => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageHeights, setPageHeights] = useState<number[]>([]);

  useEffect(() => {
    const loadPdf = async () => {
      const loadedPdf = await getDocument(
        "/12253-tham-kich-o-styles-thuviensach.vn.pdf",
      ).promise;

      const firstPage = await loadedPdf.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1 });
      const estimatedHeight = viewport.height;

      const heights = new Array(loadedPdf.numPages).fill(estimatedHeight);

      setPdf(loadedPdf);
      setPageHeights(heights);
    };
    loadPdf();
  }, []);

  const totalPages = pdf?.numPages ?? 0;

  const virtualizer = useVirtualizer({
    count: totalPages,
    estimateSize: (index) => pageHeights[index] ?? 792,
    getScrollElement: () => scrollElementRef.current,
    overscan: 1,
    gap: 8,
  });

  const virtualizerItems = virtualizer.getVirtualItems();

  if (!pdf) return null;

  return (
    <>
      <ToolBar className="sticky top-0" totalPages={totalPages} />

      <div
        ref={scrollElementRef}
        className="h-[calc(100dvh-80px)] w-full overflow-y-auto"
      >
        <div
          //TODO: sync with zoom
          className={`relative [--total-scale-factor:1]`}
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          {virtualizerItems.map((virtualizerItem) => (
            <PdfPage
              key={virtualizerItem.index}
              pdf={pdf}
              pageNumber={virtualizerItem.index + 1}
              className="absolute top-0 left-1/2"
              style={{
                transform: `translateY(${virtualizerItem.start}px) translateX(-50%)`,
                height: `${virtualizerItem.size}px`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PdfReader;
