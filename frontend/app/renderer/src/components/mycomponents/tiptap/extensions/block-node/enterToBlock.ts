import { Extension } from "@tiptap/core";

const EnterToBlock = Extension.create({
  name: "enterToBlock",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        editor
          .chain()
          .command(({ tr, dispatch }) => {
            const { selection } = tr;
            const position = selection.$to.end();

            if (dispatch) {
              tr.insert(position, editor.schema.nodes.block.create());
              tr.setSelection(
                editor.state.selection.constructor.near(
                  tr.doc.resolve(position + 1),
                ),
              );
              dispatch(tr.scrollIntoView());
            }

            return true;
          })
          .run();

        return true;
      },
    };
  },
});
