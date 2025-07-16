import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import SlashCommandExtension from "./extensions/slashCommands";
// import suggestion from "./extensions/suggestion";

const extensions = [StarterKit, SlashCommandExtension];

const content = "<p>Hello World!</p>";

const TextEditor = () => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};

export default TextEditor;
