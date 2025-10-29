import { ipcRenderer } from "electron";

export const documentAPIs = {
  createDocument: (title: string) =>
    ipcRenderer.invoke("create-document", title),
  updateDocument: (id: string, title: string, content: string) =>
    ipcRenderer.invoke("update-document", id, title, content),
  getDocumentsList: () => ipcRenderer.invoke("get-documents-list"),
};
