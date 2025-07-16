import { create } from "zustand";
import { applyNodeChanges, Edge, MarkerType, Node, NodeChange } from "@xyflow/react";

interface FlowState {
  nodes: Node[],
  edges: Edge[],
  tool: "select" | "pan",
  setTool: (tool: "select" | "pan") => void,
  setNodes: (updater: (nodes: Node[]) => Node[]) => void
  setEdges: (updater: (edges: Edge[]) => Edge[]) => void
  onNodesChange: (changes: NodeChange<Node>[]) => void
  onNodeDoubleClick: (event: React.MouseEvent, node: Node) => void
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [
    {
      id: "1",
      type: "notenode",
      position: { x: 250, y: 300 },
      data: { text: "Hello1", isEditing: false },
      style: {
        height: 64,
        width: 240,
      }
    },
    {
      id: "2",
      type: "notenode",
      position: { x: 650, y: 300 },
      data: { text: "Hello2", isEditing: false },
    },
    {
      id: "4",
      type: "notenode",
      position: { x: 450, y: 390 },
      data: { text: "Hello4", isEditing: false },
    },
    {
      id: "3",
      type: "groupnode",
      position: { x: 250, y: 550 },
      data: { label: "Hello3" },
    },
  ],
  edges: [
    {
      id: "2",
      source: "1",
      sourceHandle: "bottom",
      target: "4",
      targetHandle: "top",
      type: "floating",
      style: {
        strokeWidth: "2px",
        stroke: "oklab(0.21 0.00164225 -0.00577088 / 0.2)",
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 8,
        height: 8,
      },
    },
    {
      id: "3",
      source: "4",
      sourceHandle: "right",
      target: "2",
      targetHandle: "left",
      type: "floating",
      style: {
        strokeWidth: "2px",
        stroke: "oklab(0.21 0.00164225 -0.00577088 / 0.2)",
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 8,
        height: 10,
      },
    }
  ],
  tool: "select",
  setTool: (tool) => set({ tool }),

  setNodes: (updater) => set((state) => ({ nodes: updater(state.nodes) })),
  setEdges: (updater) => set((state) => ({ edges: updater(state.edges) })),

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    })
  },

  onNodeDoubleClick: (_, node) => {
    get().setNodes((nodes) => 
      nodes.map((n) => 
        n.id === node.id ? {...n, data: {...n.data, isEditing: true}} : n
      )
    )
  }
}))