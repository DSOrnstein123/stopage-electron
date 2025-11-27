import { useGetDocumentsList } from "@/features/documents/hooks/useGetDocumentsList";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import File from "./items/File";

const List = () => {
  //TODO: folder
  //TODO: fix getDocumentsList type
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const { data: documentsList = [] } = useGetDocumentsList();

  const virtualizer = useVirtualizer({
    count: documentsList.length,
    estimateSize: () => 32,
    getScrollElement: () => scrollElementRef.current,
  });

  const virtualizerItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={scrollElementRef}
      className="h-[calc(100dvh-16px)] overflow-y-auto"
    >
      <div
        className="relative"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizerItems.map((virtualizerItem) => {
          const document = documentsList[virtualizerItem.index];

          return (
            <div
              key={virtualizerItem.key}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualizerItem.start}px)`,
                height: `${virtualizerItem.size}px`,
              }}
              data-index={virtualizerItem.index}
            >
              <File title={document.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
