import electron = require("electron")

electron.contextBridge.exposeInMainWorld("api", {
  getFlashcardById: () => electron.ipcRenderer.invoke("get-flashcard-by-id"),
  insertDeck: () => electron.ipcRenderer.invoke("insert-deck"),
})
