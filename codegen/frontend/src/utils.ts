import { format } from "prettier";

export const camelCaseToKebabCase = (camelCaseString: string) => {
  return camelCaseString.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const prettierFormat = (code: string) => {
  return format(code, { parser: "typescript" });
};
