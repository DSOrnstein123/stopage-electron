import { Command, Editor } from "@tiptap/react";

interface SuggestionItem {
  title: string;
  command: Command
}

export const getSuggestionItems: SuggestionItem[] = () => {
  return [
    {
      title: "Heading 1",
      command: ({editor, range}) => {
        editor
          .chain()
          .focus()
          .deleteRange(range) // Xóa "/header" hoặc "/h1"
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      title: "Paragraph",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("paragraph")
          .run();
      },
    }]}