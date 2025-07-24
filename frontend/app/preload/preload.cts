import electron = require("electron");

electron.contextBridge.exposeInMainWorld("api", {
  getDeckById: () => electron.ipcRenderer.invoke("get-deck-by-id"),
  getDecksPaginated: (params: {
    page?: string;
    limit?: string;
    name?: string;
  }) => electron.ipcRenderer.invoke("get-decks-paginated", params),
  insertDeck: () => electron.ipcRenderer.invoke("insert-deck"),
});
