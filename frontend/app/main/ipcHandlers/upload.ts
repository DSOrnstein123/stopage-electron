import { dialog } from "electron";
import fs from "fs";
import path from "path";

const getAtlasPathFromJSON = (jsonPath: string): string => {
  const atlasTxtPath = jsonPath.replace(".json", ".atlas.txt");
  if (fs.existsSync(atlasTxtPath)) {
    return atlasTxtPath;
  }

  const atlasPath = jsonPath.replace(".json", ".atlas");
  if (fs.existsSync(atlasPath)) {
    return atlasPath;
  }

  throw new Error("Atlas file not found (.atlas or .atlas.txt)");
};

const handleUploadFile = async () => {
  const res = await dialog.showOpenDialog({
    title: "Choose an image",
    properties: ["openFile"],
    filters: [
      // { name: "Images", extensions: ["png", "jpg"] },
      //plugin-spine
      { name: "Spine", extensions: ["json"] },
      //
    ],
  });

  if (res.canceled) return;

  const jsonPath = res.filePaths[0];
  const lastIndexOfSlash = jsonPath.lastIndexOf(`\\`);
  const imagePath = jsonPath.slice(0, lastIndexOfSlash);
  const files = fs.readdirSync(imagePath);

  const jsonText = fs.readFileSync(jsonPath, "utf-8");
  const jsonData = JSON.parse(jsonText);

  const atlasPath = getAtlasPathFromJSON(jsonPath);
  const atlasText = fs.readFileSync(atlasPath, "utf-8");
  const processedAtlasText = atlasText.replace(
    /^\s*.*\.(png|jpg|jpeg|webp)$/gim,
    (match) => match.toLowerCase(),
  );

  const imgs = files.filter((file) => file.endsWith(".png"));
  const images: Record<string, string> = {};
  for (const f of imgs) {
    const fullPath = path.join(imagePath, f);

    const buffer = fs.readFileSync(fullPath);

    images[f.toLowerCase()] =
      `data:image/png;base64,${buffer.toString("base64")}`;
  }

  return { jsonData, processedAtlasText, imagePath, jsonPath, images };
};

export default handleUploadFile;
