declare global {
  interface Window {
    api: {
      createDocument: (
        title: string,
      ) => Promise<
        import("F:/Code/stopage-main/frontend/app/main/ipcHandlers/documents").Document[]
      >;
      updateDocument: (
        id: string,
        title: string,
        content: string,
      ) => Promise<void>;
      getDocumentsList: () => Promise<any>;
    };
  }
}

export {};
