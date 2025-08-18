import axios from "axios";
import { IpcMainInvokeEvent } from "electron";

const handleGetDeckById = async () => {
  const res = await axios.get("http://localhost:5000/api/decks", {
    params: { deckId: "89a0f249-51a4-4e2a-bf11-176b2627ef7f" },
  });
  return res.data;
};

const handleInsertDeck = async (
  _: IpcMainInvokeEvent,
  { name, parentId }: { name: string; parentId: string }
) => {
  try {
    const res = await axios.post("http://localhost:5000/api/decks", {
      name: name,
      parentId: parentId,
    });
    return res.data;
  } catch {
    return { success: false };
  }
};

const handleGetDecksPaginated = async (
  _: IpcMainInvokeEvent,
  {
    name = "",
    page = "1",
    limit = "10",
  }: { name?: string; page?: string; limit?: string }
) => {
  try {
    const res = await axios.get("http://localhost:5000/api/decks", {
      params: {
        name,
        page,
        limit,
      },
    });
    return res.data;
  } catch {
    return { success: false };
  }
};

export { handleGetDeckById, handleInsertDeck, handleGetDecksPaginated };
