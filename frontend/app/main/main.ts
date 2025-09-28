import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { getPreloadPath } from "../preload/pathResolver.js";

import {
  handleGetDeckById,
  handleGetDecksPaginated,
  handleInsertDeck,
} from "./ipcHandlers/flashcards.js";
import {
  handleCreateDocument,
  handleGetDocumentsList,
  handleUpdateDocument,
} from "./ipcHandlers/documents.js";
import handleUploadFile from "./ipcHandlers/upload.js";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 2000,
    height: 1500,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
    },
  });

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

  //documents
  ipcMain.handle("create-document", handleCreateDocument);
  ipcMain.handle("update-document", handleUpdateDocument);
  ipcMain.handle("get-documents-list", handleGetDocumentsList);

  createWindow();
});
