import type { IAnimation, ISlot } from "pixi-spine";
import type { Application, Container, DisplayObject } from "pixi.js";
import { create } from "zustand";

interface SpinePlayerState {
  application: Application<HTMLCanvasElement> | null;
  spineContainer: Container<DisplayObject> | null;
  animations: IAnimation[];
  slots: ISlot[];

  setApplication: (application: Application<HTMLCanvasElement> | null) => void;
  setSpineContainer: (spineContainer: Container<DisplayObject> | null) => void;
  setAnimations: (animations: IAnimation[]) => void;
  setSlots: (slots: ISlot[]) => void;
}

const useSpinePlayerStore = create<SpinePlayerState>((set) => ({
  application: null,
  spineContainer: null,
  animations: [],
  slots: [],

  setApplication: (application) =>
    set({
      application: application,
    }),
  setSpineContainer: (spineContainer) =>
    set({
      spineContainer: spineContainer,
    }),
  setAnimations: (animations) =>
    set({
      animations: animations,
    }),
  setSlots: (slots) =>
    set({
      slots: slots,
    }),
}));

export default useSpinePlayerStore;
