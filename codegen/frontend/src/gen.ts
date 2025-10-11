import path from "path";
import { APIIPCHandleGen } from "./mainGen";
import { typeGen } from "./typeGen";
import { APIPreloadGen } from "./preloadGen";

const gen = async (namespace: string) => {
  const funcDecls = await APIIPCHandleGen(
    path.resolve(
      __dirname,
      `../../../frontend/app/main/ipcHandlers/${namespace}.ts`
    )
  );

  typeGen(
    path.resolve(__dirname, `../../../frontend/types/ipc/${namespace}.d.ts`),
    funcDecls
  );

  APIPreloadGen(
    path.resolve(
      __dirname,
      `../../../frontend/app/preload/api/${namespace}.ts`
    ),
    funcDecls
  );
};

gen("documents");
