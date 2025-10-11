import { IpcHandlerFunction } from "./types";
import { camelCaseToKebabCase, prettierFormat } from "./utils";
import fs from "fs";

export const APIPreloadGen = async (
  path: string,
  funcDecls: IpcHandlerFunction[]
) => {
  const apis = funcDecls.map(
    (funcDecl) =>
      `${funcDecl.name}: (${funcDecl.params?.map((param) => `${param.name}: ${param.type}`)}) => ipcRenderer.invoke("${camelCaseToKebabCase(funcDecl.name)}", ${funcDecl.params?.map((param) => `${param.name}`)})`
  );

  const code = `
    import { ipcRenderer } from "electron";

    export const documentAPIs = {
      ${apis.join(",")}
    };
  `;

  fs.writeFileSync(path, await prettierFormat(code), "utf-8");
};
