import { useEffect, useRef } from "react";
import {
  Application,
  BaseTexture,
  Color,
  Container,
  Graphics,
  Point,
} from "pixi.js";
import useSpinePlayerStore from "./spinePlayerStore";

const SpinePlayer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cropBorderRef = useRef<HTMLDivElement | null>(null);

  const setApplication = useSpinePlayerStore((state) => state.setApplication);
  const setSpineContainer = useSpinePlayerStore(
    (state) => state.setSpineContainer,
  );

  useEffect(() => {
    if (!containerRef.current || !cropBorderRef.current) return;
    const container = containerRef.current;
    const cropBorder = cropBorderRef.current;

    const app = new Application<HTMLCanvasElement>({
      resizeTo: container,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: new Color("#e5e7eb"),
      premultipliedAlpha: true,
      backgroundAlpha: 0,
    });
    container.appendChild(app.view);

    app.stage.x = app.renderer.width / 2;
    app.stage.y = app.renderer.height / 2;

    BaseTexture.defaultOptions.alphaMode = 2;

    const spineContainer = new Container();
    app.stage.addChild(spineContainer);

    const cropBorderRect = cropBorder.getBoundingClientRect();
    const cropRect = new Graphics()
      .beginFill(0x0000ff)
      .drawRect(
        -cropBorderRect.width / 2,
        -cropBorderRect.height / 2,
        cropBorderRect.width,
        cropBorderRect.height,
      )
      .endFill();
    app.stage.addChild(cropRect);

    spineContainer.mask = cropRect;

    setApplication(app);
    setSpineContainer(spineContainer);

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        app.resize();
        app.stage.x = app.renderer.width / 2;
        app.stage.y = app.renderer.height / 2;
        cropRect.position.set(0, 0);
      });
    });

    resizeObserver.observe(container);

    app.view.addEventListener("wheel", (e) => {
      e.preventDefault();

      const scaleFactor = e.deltaY < 0 ? 1.1 : 0.9;

      const mousePosBefore = spineContainer.toLocal(
        new Point(e.clientX, e.clientY),
        app.stage,
      );

      spineContainer.scale.x *= scaleFactor;
      spineContainer.scale.y *= scaleFactor;

      const mousePosAfter = spineContainer.toLocal(
        new Point(e.clientX, e.clientY),
        app.stage,
      );

      spineContainer.x +=
        (mousePosAfter.x - mousePosBefore.x) * spineContainer.scale.x;
      spineContainer.y +=
        (mousePosAfter.y - mousePosBefore.y) * spineContainer.scale.y;
    });

    const lastPos = { x: 0, y: 0 };

    app.view.addEventListener("mousedown", (e: MouseEvent) => {
      lastPos.x = e.clientX;
      lastPos.y = e.clientY;

      app.view.addEventListener("mousemove", handleMouseMove);
      app.view.addEventListener("mouseup", handleMouseUp);
    });

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;

      spineContainer.x += dx;
      spineContainer.y += dy;

      lastPos.x = e.clientX;
      lastPos.y = e.clientY;
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();

      app.view.removeEventListener("mousemove", handleMouseMove);
      app.view.removeEventListener("mouseup", handleMouseUp);
    };

    return () => {
      while (container.firstChild) {
        container?.firstChild.remove();
      }
      resizeObserver.disconnect();
      setApplication(null);
      app.destroy();
    };
  }, [setApplication, setSpineContainer]);

  return (
    <div className="relative h-[calc(100vh_-_81px)] w-full bg-gray-200">
      <div
        ref={containerRef}
        className="relative isolate z-0 h-full w-full before:absolute before:left-1/2 before:-z-[1] before:h-full before:w-[0.25px] before:-translate-x-[50%] before:bg-gray-400 before:content-[''] after:absolute after:top-1/2 after:-z-[1] after:h-[0.25px] after:w-full after:-translate-y-[50%] after:bg-gray-400 after:content-['']"
      />
      <div
        ref={cropBorderRef}
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-video w-[900px] -translate-x-1/2 -translate-y-1/2 border-1 border-gray-400 bg-transparent"
      />
    </div>
  );
};

export default SpinePlayer;
