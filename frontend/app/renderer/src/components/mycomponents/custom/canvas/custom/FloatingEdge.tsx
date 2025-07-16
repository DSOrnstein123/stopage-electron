import { BaseEdge, EdgeProps } from "@xyflow/react";
import { getPath } from "../utils/ultils";
import { memo } from "react";

const FloatingEdge = ({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  style,
}: EdgeProps) => {
  const path = getPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <g>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="4"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path
            d="M 0 0 L 10 5 L 0 10 z"
            fill="oklab(0.21 0.00164225 -0.00577088 / 0.2)"
          />
        </marker>
      </defs>

      <BaseEdge id={id} path={path} style={style} markerEnd="url(#arrow)" />
    </g>
  );
};

export default memo(FloatingEdge);
