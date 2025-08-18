import { app, BrowserWindow, dialog, ipcMain } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { getPreloadPath } from "../preload/pathResolver.js";
import fs from "fs";

import {
  handleGetDeckById,
  handleGetDecksPaginated,
  handleInsertDeck,
} from "./ipcHandlers/flashcards.js";
import {
  handleCreateDocument,
  handleUpdateDocument,
} from "./ipcHandlers/documents.js";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 750,
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

  ipcMain.handle("import-image", async () => {
    const res = await dialog.showOpenDialog({
      title: "Choose an image",
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["png", "jpg"] }],
    });

    if (res.canceled) return;

    const originalPath = res.filePaths[0];
    const storedPath = path.join(app.getPath("userData"), "images", "abc.jpg");

    fs.copyFileSync(originalPath, storedPath);
  });

  //documents
  ipcMain.handle("create-document", handleCreateDocument);
  ipcMain.handle("update-document", handleUpdateDocument);

  createWindow();
});
