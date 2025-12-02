import { Label } from "@/components/shadcn/label";
import { Slider } from "@/components/shadcn/slider";
import type { Color } from "pixi-spine";
import { useRef } from "react";

const AlphaSlider = ({
  slotColor,
  index,
}: {
  slotColor: Color;
  index: number;
}) => {
  const alphaValueRef = useRef<HTMLSpanElement | null>(null);

  return (
    <div className="mt-2 flex h-4 items-center gap-x-1">
      <Label className="pb-1 text-base font-normal" htmlFor={`${index}`}>
        α:
      </Label>
      <Slider
        id={`${index}`}
        defaultValue={[100]}
        max={100}
        step={1}
        onValueChange={(value) => {
          const alpha = value[0] / 100;
          alphaValueRef.current!.innerText = `${alpha.toFixed(2)}`;
          slotColor.a = alpha;
        }}
      />
      <span className="pb-0.5" ref={alphaValueRef}>
        1.00
      </span>
    </div>
  );
};

export default AlphaSlider;
