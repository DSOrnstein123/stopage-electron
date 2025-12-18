import { BubbleMenu } from "@tiptap/react/menus";
import { Editor, useEditorState } from "@tiptap/react";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";

//TODO: optimize
//TODO: fixed position
//TODO: not appear when select from right to left
interface ToolbarButton {
  label: string;
  isActive: boolean;
  action: () => void;
}

const CustomBubbleMenu = ({ editor }: { editor: Editor }) => {
  const { isBold, isItalic, isStrike } = useEditorState({
    editor: editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isStrike: editor.isActive("strike"),
    }),
  });

  const toolbarButtons: ToolbarButton[] = [
    {
      label: "Bold",
      isActive: isBold,
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      isActive: isItalic,
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "Strike",
      isActive: isStrike,
      action: () => editor.chain().focus().toggleStrike().run(),
    },
  ];

  return (
    <BubbleMenu
      editor={editor}
      options={{ placement: "bottom", offset: 8, flip: true }}
    >
      <div className="flex gap-x-1 rounded-md border-1 p-1">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            onClick={button.action}
            className={cn(
              "hover:bg-secondary rounded-sm border-0 bg-white p-2 text-black shadow-white outline-0",
              button.isActive && "bg-red-400",
            )}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </BubbleMenu>
  );
};

export { CustomBubbleMenu };
