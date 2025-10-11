import fs from "fs";
import { prettierFormat } from "./utils";
import { IpcHandlerFunction } from "./types";

export const typeGen = async (
  path: string,
  funcDecls: IpcHandlerFunction[]
) => {
  const types = funcDecls.map(
    (funcDecl) =>
      `${funcDecl.name}: (${funcDecl.params?.map((param) => `${param.name}: ${param.type}`)}) => ${funcDecl.returnType}`
  );

  const code = `
    declare global {
      interface Window {
        api: {
          ${types.join("\n")}
        };
      }
    }
    
    export {};
  `;

  fs.writeFileSync(path, await prettierFormat(code), "utf8");
};
