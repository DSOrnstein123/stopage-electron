import axios from "axios";
import { IpcMainInvokeEvent } from "electron";

const handleCreateDocument = async (
  _: IpcMainInvokeEvent,
  title: string | null,
) => {
  try {
    const res = await axios.post("http://localhost:5000/api/documents", {
      title: title,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const handleUpdateDocument = async (
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

export { handleCreateDocument, handleUpdateDocument };
