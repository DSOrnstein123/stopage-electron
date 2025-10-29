import { ipcMain } from "electron";
import net from "net";

export const isDev = (): boolean => {
  return process.env.NODE_ENV === "development";
};

type IpcMainInvokeHandler = Parameters<typeof ipcMain.handle>[1];

export const registerHandlers = (
  handlers: Record<string, IpcMainInvokeHandler>,
) => {
  Object.entries(handlers).forEach(([key, value]) => {
    ipcMain.handle(key, value);
  });
};

export async function waitForPort(port: number, host = "localhost") {
  return new Promise<void>((resolve) => {
    const tryConnect = () => {
      const socket = net.createConnection(port, host);
      socket.on("connect", () => {
        socket.end();
        resolve();
      });
      socket.on("error", () => {
        setTimeout(tryConnect, 500);
      });
    };
    tryConnect();
  });
}
