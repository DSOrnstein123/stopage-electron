import { useEffect, useRef } from "react";
import { useTabStore } from "@/store/tabStore";

const DocumentTitle = () => {
  const activeTabId = useTabStore((state) => state.activeTabId);
  const tabs = useTabStore((state) => state.tabs);
  const updateTabTitle = useTabStore((state) => state.updateTabTitle);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const title = activeTab?.title ?? "";

  const h1Ref = useRef<HTMLHeadingElement>(null);

  // Đồng bộ store -> DOM khi tab đổi
  useEffect(() => {
    if (h1Ref.current && h1Ref.current.textContent !== title) {
      h1Ref.current.textContent = title;
    }
  }, [title]);

  return (
    <div className="relative mb-2">
      <h1
        ref={h1Ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) =>
          updateTabTitle(activeTabId!, e.currentTarget.textContent || "")
        }
        className="text-4xl font-bold outline-none"
      />
      {!title && (
        <span className="pointer-events-none absolute top-0 left-0 text-4xl font-bold text-gray-400">
          Title
        </span>
      )}
    </div>
  );
};

export default DocumentTitle;
