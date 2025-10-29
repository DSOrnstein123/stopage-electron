import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev, registerHandlers, waitForPort } from "./utils.js";
import { getPreloadPath } from "../preload/pathResolver.js";

import {
  handleGetDeckById,
  handleGetDecksPaginated,
  handleInsertDeck,
} from "./ipcHandlers/flashcards.js";
import handleUploadFile from "./ipcHandlers/upload.js";
import { documentHandlers } from "./ipcHandlers/documents.js";

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 2000,
    height: 1500,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
    },
  });

  await waitForPort(5000);

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(
      path.join(app.getAppPath(), "/dist-frontend/index.html"),
    );

    mainWindow.setMenu(null);
  }
};

app.whenReady().then(() => {
  //flashcards
  ipcMain.handle("insert-deck", handleInsertDeck);
  ipcMain.handle("get-decks-paginated", handleGetDecksPaginated);
  ipcMain.handle("get-deck-by-id", handleGetDeckById);

  ipcMain.handle("upload-file", handleUploadFile);

  registerHandlers(documentHandlers);

  createWindow();
});
