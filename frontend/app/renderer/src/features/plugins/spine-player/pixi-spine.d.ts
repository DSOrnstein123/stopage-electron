declare module "@pixi-spine/loader-uni" {
  export class SpineLoader extends SpineLoaderAbstract {
    createBinaryParser(): UniBinaryParser;
    createJsonParser(): UniJsonParser;
    parseData(parser, atlas, dataToParse): { spineData; spineAtlas };
  }
}
