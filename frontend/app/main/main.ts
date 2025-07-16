import { app, BrowserWindow, ipcMain } from "electron"
import path from "path"
import { isDev } from "./utils.js"
import { getPreloadPath } from "../preload/pathResolver.js"
import axios from "axios"

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
    },
  })

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123")
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-frontend/index.html"))
  }
}

const handleGetFlashcardById = async () => {
  const res = await axios.get("http://localhost:5000/api/decks", {
    params: { deckId: "89a0f249-51a4-4e2a-bf11-176b2627ef7f" }
  })
  return res.data
}

const handleInsertDeck = async (_event: Electron.IpcMainInvokeEvent, { name,parentId }: {name: string; parentId: string}) => {
  try {
    const res = await axios.post("http://localhost:5000/api/decks", {
      name,
      parentId: parentId
    })
    return res.data
  } catch {
    return { success: false };
  }
}

app.whenReady().then(() => {
  ipcMain.handle("get-flashcard-by-id", handleGetFlashcardById)
  ipcMain.handle("insert-deck", handleInsertDeck)
  createWindow()
})