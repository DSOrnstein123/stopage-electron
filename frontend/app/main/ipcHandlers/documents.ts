import axios from "axios";
import { IpcMainInvokeEvent } from "electron";

export interface Document {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const createDocument = async (
  _: IpcMainInvokeEvent,
  title: string | undefined,
): Promise<Document[]> => {
  try {
    const res = await axios.post("http://localhost:5000/api/documents", {
      title: title,
    });

    if (res.status !== 201) {
      throw new Error(`Unexpected status: ${res.status}`);
    }

    return res.data;
  } catch (e) {
    console.error("Failed to create document: ", e);
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.error || "Failed to create document");
    }
    throw e;
  }
};

const updateDocument = async (
  _: IpcMainInvokeEvent,
  id: string,
  title: string | null,
  content: string | null,
) => {
  try {
    await axios.post(`http://localhost:5000/api/documents/${id}`, {
      title: title,
      content: content,
    });
  } catch (e) {
    console.log(e);
  }
};

const getDocumentsList = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/documents");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const documentHandlers = {
  "create-document": createDocument,
  "update-document": updateDocument,
  "get-documents-list": getDocumentsList,
};
