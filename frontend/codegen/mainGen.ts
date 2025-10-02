import { Project, SyntaxKind, VariableDeclarationKind } from "ts-morph";
import { camelCaseToKebabCase } from "./utils";

export const APIIPCHandleGen = (path: string) => {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(path);

  const varDecls = sourceFile.getDescendantsOfKind(
    SyntaxKind.VariableDeclaration,
  );

  const funcDecls = varDecls.filter((varDecl) => {
    const init = varDecl.getInitializer();
    if (!init) return false;
    return [SyntaxKind.ArrowFunction, SyntaxKind.FunctionExpression].includes(
      init?.getKind(),
    );
  });

  const handleProps = funcDecls.map(
    (funcDecl) =>
      `"${camelCaseToKebabCase(funcDecl.getName())}": ${funcDecl.getName()}`,
  );

  sourceFile.getVariableStatement("documentHandlers")?.remove();

  sourceFile.addVariableStatement({
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

  sourceFile.save();
};

APIIPCHandleGen("../app/main/ipcHandlers/documents.ts");
