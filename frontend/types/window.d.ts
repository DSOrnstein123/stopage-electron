import type { Documents } from "./ipc/documents";
import type { Global } from "./types";

declare global {
  interface Window {
    api: Documents & Global;
  }
}

export {};
