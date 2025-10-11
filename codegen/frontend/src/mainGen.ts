import { Project, SyntaxKind, VariableDeclarationKind } from "ts-morph";
import { camelCaseToKebabCase, prettierFormat } from "./utils";
import fs from "fs";
import { IpcHandlerFunction } from "./types";

export const APIIPCHandleGen = async (path: string) => {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(path);

  const varDecls = sourceFile.getDescendantsOfKind(
    SyntaxKind.VariableDeclaration
  );

  const funcDecls: IpcHandlerFunction[] = varDecls
    .map((varDecl) => ({
      name: varDecl.getName(),
      initializer: varDecl.getInitializer(),
    }))
    .filter(
      (item): item is Omit<IpcHandlerFunction, "params"> =>
        !!item.initializer &&
        [SyntaxKind.ArrowFunction, SyntaxKind.FunctionExpression].includes(
          item.initializer.getKind()
        )
    );

  funcDecls.forEach((funcDecl) => {
    funcDecl["params"] = funcDecl.initializer.getParameters().reduce(
      (acc, param) => {
        if (param.getType().getText() !== "Electron.IpcMainInvokeEvent") {
          acc.push({
            name: param.getName(),
            type: param.getType().getText(),
          });
        }
        return acc;
      },
      [] as { name: string; type: string }[]
    );

    funcDecl["returnType"] = funcDecl.initializer.getReturnType().getText();
  });

  const handleProps = funcDecls.map(
    (funcDecl) => `"${camelCaseToKebabCase(funcDecl.name)}": ${funcDecl.name}`
  );

  sourceFile.getVariableStatement("documentHandlers")?.remove();

  const formerCode = sourceFile.getFullText() + "\n";

  const varStatement = sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: "documentHandlers",
        initializer: `{
          ${handleProps.join(",\n")}
        }`,
      },
    ],
  });

  const code = formerCode + varStatement.getText();

  fs.writeFileSync(
    sourceFile.getFilePath(),
    await prettierFormat(code),
    "utf8"
  );

  return funcDecls;
};
