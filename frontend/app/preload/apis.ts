import { ipcRenderer } from "electron";
import { documentAPIs } from "./api/documents.js";

export const apis = {
  getDeckById: () => ipcRenderer.invoke("get-deck-by-id"),
  getDecksPaginated: (params: {
    page?: string;
    limit?: string;
    name?: string;
  }) => ipcRenderer.invoke("get-decks-paginated", params),
  insertDeck: () => ipcRenderer.invoke("insert-deck"),

  uploadFile: () => ipcRenderer.invoke("upload-file"),

  ...documentAPIs,
};
