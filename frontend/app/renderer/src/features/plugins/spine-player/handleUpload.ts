import { Spine, TextureAtlas } from "pixi-spine";
import { BaseTexture, Container, DisplayObject } from "pixi.js";
import { SkeletonJson, AtlasAttachmentLoader } from "@pixi-spine/runtime-3.7";

const handleSpineUpload = async (
  spineContainer: Container<DisplayObject>,
): Promise<Spine> => {
  const file = await window.api.uploadFile();

  const atlas = new TextureAtlas(file.processedAtlasText, (line, callback) => {
    callback(BaseTexture.from(file.images[line]));
  });

  const spineAtlasLoader = new AtlasAttachmentLoader(atlas);
  const spineJsonParser = new SkeletonJson(spineAtlasLoader);

  const spineData = spineJsonParser.readSkeletonData(file.jsonData);

  const spine = new Spine(spineData);

  spineContainer.addChild(spine);

  spine.autoUpdate = true;

  return spine;
};

export default handleSpineUpload;
