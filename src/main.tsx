import { continueRender, delayRender } from "remotion";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useEffect, useRef, useState } from "react";
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
  const canvas = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState<Stage | null>(null);
  useEffect(() => {
    if (canvas.current) {
      const s = new Stage(canvas.current);
      s.options.fps = config.fps;
      s.options.sec = config.durationInFrames / config.fps;
      initStage(s);
      s.loadRecourse().then(() => {
        s.setup();
        setStage(s);
        continueRender(handle)
      });
      s.render(0);
    }
  }, [canvas.current]);
  if (stage && frame !== stage.frame) {
    stage.frame = frame + 1;
    stage.render();
  }
  return (
    <canvas
      ref={canvas}
      width={config.width - left - right}
      height={config.height - top - bottom}
      style={{ position: "absolute", left, top, }}
    />
  );
};
