import { Extension, ReactRenderer } from "@tiptap/react"
import  Suggestion, { SuggestionOptions } from '@tiptap/suggestion'
import tippy, { Instance } from "tippy.js";
import SlashCommandsList from "./SlashCommandsList";

interface SlashSuggestionOptions {
  suggestion?: Partial<SuggestionOptions>;
  // commandItems?: CommandItem[];
  options?: any;
}

const SlashCommandExtension = Extension.create<SlashSuggestionOptions>({
  name: "slashCommands",

  addOptions: () => {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
        render: () => {
          let reactRenderer: ReactRenderer
          let popup: Instance[]

          return {
            onStart: (props) => {
              reactRenderer = new ReactRenderer(SlashCommandsList, {
                props,
                editor: props.editor
              })

              if (!props.clientRect) return;

              popup = tippy("body", {
                getReferenceClientRect: () => {
                  const rect = props.clientRect?.();
                  if (rect) {
                    return rect
                  }
                  return new DOMRect(0, 0, 0, 0); 
                },
                appendTo: () => document.body,
                content: reactRenderer.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },

            onUpdate(props) {
              reactRenderer.updateProps(props);

              popup[0].setProps({
                getReferenceClientRect: () => {
                  const rect = props.clientRect?.();
                  if (rect) {
                    return rect
                  }
                  return new DOMRect(0, 0, 0, 0); 
                },
              });
            },

            onKeyDown(props) {
              if (props.event.key === "Escape") {
                popup[0].hide();
                
                return true;
              }

              // return reactRenderer.ref?.onKeyDown(props);
              return false
            },

            onExit() {
              popup[0].destroy();
              reactRenderer.destroy();
            },
          }
        }
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})


export default SlashCommandExtension