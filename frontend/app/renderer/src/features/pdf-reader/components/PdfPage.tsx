import { type PDFDocumentProxy, type RenderTask } from "pdfjs-dist";
import { TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer.mjs";
import { useEffect, useRef, memo, type CSSProperties } from "react";
// import usePdfReaderStore from "../store/pdfReaderStore";

interface PdfPageProps {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  className?: string;
  style?: CSSProperties;
}

const PdfPage = memo(
  ({ pdf, pageNumber, className = "", style = {} }: PdfPageProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const renderTaskRef = useRef<RenderTask | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const highlightLayerRef = useRef<HTMLDivElement>(null);

    // const setHighlights = usePdfReaderStore((state) => state.setHighlights);

    useEffect(() => {
      let cancelled = false;

      const renderPage = async () => {
        const canvas = canvasRef.current;
        const highlightLayer = highlightLayerRef.current;
        if (!canvas || !highlightLayer || cancelled) return;

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        try {
          const context = canvas.getContext("2d");
          if (!context || cancelled) return;

          const page = await pdf.getPage(pageNumber);
          if (cancelled) return;

          const viewport = page.getViewport({ scale: 1 });

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          highlightLayer.style.width = `${viewport.width}px`;
          highlightLayer.style.height = `${viewport.height}px`;

          console.log("Rendering page:", pageNumber);

          renderTaskRef.current = page.render({
            canvas: canvas,
            canvasContext: context,
            viewport: viewport,
          });

          await renderTaskRef.current.promise;

          if (!cancelled) {
            renderTaskRef.current = null;
          }

          const textLayerBuilder = new TextLayerBuilder({
            pdfPage: page,
          });

          containerRef.current!.appendChild(textLayerBuilder.div);

          await textLayerBuilder.render({
            viewport: viewport,
          });
        } catch (error) {
          if (cancelled) return;

          console.log(error);
        }
      };
      renderPage();

      return () => {
        cancelled = true;

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }
      };
    }, [pdf, pageNumber]);

    return (
      <div
        ref={containerRef}
        className={`page border shadow-md ${className}`}
        style={style}
      >
        <div className="canvasWrapper">
          <canvas ref={canvasRef} />
        </div>

        <div ref={highlightLayerRef} className="highlight-layer"></div>
      </div>
    );
  },
);

export default PdfPage;
