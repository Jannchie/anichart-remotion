import { continueRender, delayRender } from "remotion";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useMemo, useState } from "react";
import { Stage } from "anichart";

export type AnichartProps = {
  initStage: (stage: Stage) => void;
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
};

export const Anichart: React.FC<AnichartProps> = ({
  initStage,
  left = 0,
  top = 0,
  right = 0,
  bottom = 0,
}: AnichartProps) => {
  const config = useVideoConfig();
  const frame = useCurrentFrame();
  const [handle] = useState(() => delayRender());
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const stage = useMemo(() => {
    if (canvas !== null) {
      const s = new Stage(canvas);
      s.options.fps = config.fps;
      s.options.sec = config.durationInFrames / config.fps;
      initStage(s);
      s.setup();
      s.loadRecourse().then(() => continueRender(handle));
      s.render(0);
      return s;
    }
  }, [canvas, config.durationInFrames, config.fps, handle, initStage]);
  if (stage && frame !== stage.frame) {
    stage.frame = frame + 1;
    stage.render();
  }
  return (
    <canvas
      ref={(canvas) => {
        setCanvas(canvas);
      }}
      width={config.width + 1 - left - right}
      height={config.height + 1 - top - bottom}
      style={{
        position: "absolute",
        left,
        top,
      }}
    />
  );
};
