import { getBezierPath, Position } from "@xyflow/react";

interface GetPathParams {
  sourceX: number,
  sourceY: number,
  sourcePosition: Position,
  targetX: number,
  targetY: number,
  targetPosition: Position,
}

const handleRadius = 8; 
let offset = 8
let curvature = 1.5

const getEssentialPoints = (x: number, y: number, position: Position): [startAdjustedX: number, startAdjustedY: number ,bezierX: number, bezierY: number] => {
  const adjustment: Record<Position, [startAdjustedX: number, startAdjustedY: number ,bezierX: number, bezierY: number]> = {
    [Position.Top] : [x, y + handleRadius, x, y + handleRadius - offset],
    [Position.Bottom] : [x,  y - handleRadius , x, y - handleRadius + offset],
    [Position.Left] : [x + handleRadius, y, x + handleRadius - offset, y],
    [Position.Right] : [x - handleRadius, y, x - handleRadius + offset, y],
  }

  return adjustment[position]
}

const adjustPath = (x: number, y: number): void => {
  const dif = x - y
  console.log(dif)

  if (dif < 1.5 && dif > -16)
    offset = 16
  else if (dif <= -16 && dif >= -24.5)
    offset = 20
  else
    offset = 8

  if (dif > 61)
    curvature = 0.5
  if (dif > 235)
    curvature = 0.25
}

export const getPath = ({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
}: GetPathParams): string => {
  adjustPath(sourceY, targetY)
  // adjustPath(sourceX, targetX)

  const [sourceAdjustedX, sourceAdjustedY, bezierStartX, bezierStartY] = getEssentialPoints(sourceX, sourceY, sourcePosition);
  const [targetAdjustedX, targetAdjustedY, bezierEndX, bezierEndY] = getEssentialPoints(targetX, targetY, targetPosition)

  const edgeStart = `M${sourceAdjustedX},${sourceAdjustedY} L${bezierStartX},${bezierStartY}`;
  const edgeEnd = `M${bezierEndX},${bezierEndY} L${targetAdjustedX},${targetAdjustedY}`;

  const [edgePath] = getBezierPath({
    sourceX: bezierStartX,
    sourceY: bezierStartY,
    sourcePosition,
    targetX: bezierEndX,
    targetY: bezierEndY,
    targetPosition,
    curvature,
  });

  return `${edgeStart} ${edgePath} ${edgeEnd}`
}