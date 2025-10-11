import { ArrowFunction, FunctionExpression } from "ts-morph";

export interface IpcHandlerFunction {
  name: string;
  initializer: ArrowFunction | FunctionExpression;
  params?: { name: string; type: string }[];
  returnType: string;
}
