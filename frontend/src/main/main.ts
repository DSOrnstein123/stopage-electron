import { app, BrowserWindow } from "electron"
import path from "path"
import { isDev } from "./utils.js"

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123")
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-frontend/index.html"))
  }
}

app.whenReady().then(() => {
  createWindow()
})