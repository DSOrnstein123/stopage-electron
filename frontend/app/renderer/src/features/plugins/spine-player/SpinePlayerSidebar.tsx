import { useRef } from "react";
import useSpinePlayerStore from "./spinePlayerStore";
import { Spine } from "pixi-spine";
import handleSpineUpload from "./handleUpload";
import AlphaSlider from "./AlphaSlider";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group";
import { Label } from "@/components/shadcn/label";

const SpinePlayerSidebar = () => {
  const spineContainer = useSpinePlayerStore((state) => state.spineContainer);
  const animations = useSpinePlayerStore((state) => state.animations);
  const setAnimations = useSpinePlayerStore((state) => state.setAnimations);
  const slots = useSpinePlayerStore((state) => state.slots);
  const setSlots = useSpinePlayerStore((state) => state.setSlots);

  const spine = useRef<Spine>(null);

  return (
    <>
      <button
        onClick={async () => {
          spineContainer!.removeChildren();

          //TODO: destroy spine
          // if (spine.current)
          // spine.current.destroy();
          spine.current = await handleSpineUpload(spineContainer!);
          setAnimations(spine.current!.stateData.skeletonData.animations);
          setSlots(spine.current!.skeleton.slots);
        }}
        className="border-1"
      >
        Upload
      </button>

      <RadioGroup
        className="mb-2"
        defaultValue="pma"
        onValueChange={(value) => {
          slots.forEach((slot) => {
            // TODO: use native method
            // @ts-expect-errors pixi-spine don't provide method to access attachment directly
            if (slot.getAttachment() && slot.getAttachment().region) {
              // @ts-expect-errors pixi-spine don't provide method to access attachment directly
              const texture = slot.getAttachment().region.texture;
              if (texture && texture.baseTexture) {
                texture.baseTexture.alphaMode = Number(value);
                texture.baseTexture.update();
              }
            }
          });
        }}
      >
        {["npm", "unpkg", "pma"].map((mode, index) => (
          <div key={index} className="flex justify-between">
            <Label htmlFor={mode}>{mode.toUpperCase()}</Label>
            <RadioGroupItem value={`${index}`} id={mode} />
          </div>
        ))}
      </RadioGroup>

      {animations.length > 0 && (
        <div className="mb-4 flex flex-col gap-y-2">
          {animations.map((animation, index) => (
            <button
              key={index}
              onClick={() => {
                spine.current.state.setAnimation(0, animation.name, true);
              }}
              className="block border-1"
            >
              {animation.name}
            </button>
          ))}
        </div>
      )}

      {slots.length > 0 && (
        <div className="flex flex-col gap-y-2">
          {slots.map((slot, index) => (
            <div
              key={index}
              className="overflow-x-hidden border-1 bg-white p-2"
            >
              {slot.data.name}

              <AlphaSlider slotColor={slot.color} index={index} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SpinePlayerSidebar;
