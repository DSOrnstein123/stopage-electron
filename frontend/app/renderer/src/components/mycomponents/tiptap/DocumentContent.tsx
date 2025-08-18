import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import SlashCommandExtension from "./extensions/slashCommands";
import { Placeholder } from "@tiptap/extensions";
import { useParams } from "react-router-dom";
import debounce from "@/utils/debounce";
import { useEffect } from "react";

const extensions = [
  StarterKit.configure({
    document: false,
  }),
  SlashCommandExtension,
  Placeholder.configure({
    placeholder: () => {
      return "";
    },
    showOnlyCurrent: false,
  }),
  // Block,
  // KanbanNode,
];

const content = `
  <h1 className="mb-5"></h1>
`;

const DocumentContent = () => {
  const { id } = useParams();

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  const saveContent = debounce<(editor: Editor) => void>((currentEditor) => {
    const docJSON = currentEditor.getJSON();

    const titleJSON = docJSON.content.find(
      (c) => c.type === "heading" && c.attrs?.level === 1,
    );
    const title = (titleJSON?.content?.[0] as any)?.text || null;

    window.api.updateDocument(id, title, JSON.stringify(docJSON));
  }, 1000);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = (editor: Editor) => {
      saveContent(editor);
    };

    editor.on("update", ({ editor }) => handleUpdate(editor));

    return () => {
      editor.off("update", ({ editor }) => handleUpdate(editor));
    };
  }, [editor]);

  return <EditorContent editor={editor} />;
};

export default DocumentContent;
