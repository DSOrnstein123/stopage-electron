import { type StateCreator } from "zustand";

export type DefaultStateCreator<StateType, SliceType> = StateCreator<
  StateType,
  [],
  [],
  SliceType
>;
