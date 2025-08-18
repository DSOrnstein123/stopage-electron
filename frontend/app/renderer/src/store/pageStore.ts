import { create } from "zustand";

// interface Block {
//   // id: string,
//   content: string,
// }

interface PageState {
  blocks: Record<string, string>,
  order: string[],
  // setBlocks: (blocks: Block[]) => void
  updateBlocks: (id: string, newBlock: string) => void
  moveBlock: (fromIndex: number, toIndex: number) => void
  addOrder: (index: number, id: string) => void
  headerHeight: number,
  setHeaderHeight: (height: number) => void,
}

export const usePageStore = create<PageState>((set) => ({
  blocks: {
    "1": `<p><strong>Hello 1 ad</strong></p>`,
    "2": `<p><strong>Hello 2 ad</strong></p>`,
    "3": `<p><strong>Hello 3 ad</strong></p>`,
    "4": `<p><strong>Hello 4 ad</strong></p>`,
  },

  order: ["1", "2", "3", "4"],

  // setBlocks: (blocks) => set({ blocks }),

  moveBlock: (fromIndex, toIndex) => set((state) => {
    const newOrder = [...state.order];
    const [movedOrder] = newOrder.splice(fromIndex, 1)
    newOrder.splice(toIndex, 0, movedOrder)
    return {order: newOrder}
  }),

  addOrder: (index, id) => set((state) => {
    const newOrder = [...state.order];
    newOrder.splice(index + 1, 0, id)
    return {order: newOrder}
  }),

  updateBlocks: (id, newContent) => set((state) => {
    const newBlocks = {
      ...state.blocks,
      [id]: newContent,
    }
    return {blocks: newBlocks}
  }),

  headerHeight: 0,
  setHeaderHeight: (height) => set({ headerHeight: height })
}))