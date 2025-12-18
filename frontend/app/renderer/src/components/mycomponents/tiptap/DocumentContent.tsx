import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import SlashCommandExtension from "./extensions/slashCommands";
import EnterToBlock from "./extensions/block-node/enterToBlock";
import ContentBlock from "./extensions/block-node/contentBlock";
import { CustomBubbleMenu as BubbleMenu } from "./CustomBubbleMenu";
import { useParams } from "react-router-dom";
import debounce from "@/utils/debounce";
import { useEffect } from "react";

const extensions = [
  StarterKit,
  SlashCommandExtension,
  ContentBlock,
  EnterToBlock,
  // KanbanNode,
];

const content = ``;

const DocumentContent = () => {
  // const { id } = useParams();

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "flex h-full flex-col gap-y-2 focus:outline-none",
      },
    },
  });

  // const saveContent = debounce<(editor: Editor) => void>((currentEditor) => {
  //   const docJSON = currentEditor.getJSON();

  // }, 1000);

  // useEffect(() => {
  //   if (!editor) return;

  //   const handleUpdate = (editor: Editor) => {
  //     saveContent(editor);
  //   };

  //   editor.on("update", ({ editor }) => handleUpdate(editor));

  //   return () => {
  //     editor.off("update", ({ editor }) => handleUpdate(editor));
  //   };
  // }, [editor, saveContent]);

  return (
    <>
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default DocumentContent;
