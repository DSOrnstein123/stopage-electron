import { apis } from "./apis";

const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  ...apis,
});
