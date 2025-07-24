import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { getPreloadPath } from "../preload/pathResolver.js";

import {
  handleGetDeckById,
  handleGetDecksPaginated,
  handleInsertDeck,
} from "./ipcHandlers/flashcards.js";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(
      path.join(app.getAppPath(), "/dist-frontend/index.html")
    );
  }
};

app.whenReady().then(() => {
  //flashcards
  ipcMain.handle("insert-deck", handleInsertDeck);
  ipcMain.handle("get-decks-paginated", handleGetDecksPaginated);
  ipcMain.handle("get-deck-by-id", handleGetDeckById);

  createWindow();
});
