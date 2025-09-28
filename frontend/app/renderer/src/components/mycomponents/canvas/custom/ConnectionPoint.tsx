import { Handle, Position } from "@xyflow/react";

const ConnectionPoint = () => {
  const positions = {
    top: Position.Top,
    right: Position.Right,
    bottom: Position.Bottom,
    left: Position.Left,
  };

  return (
    <>
      {Object.entries(positions).map(([key, value]) => (
        <Handle
          key={key}
          id={key}
          className="handle"
          style={{
            height: "16px",
            width: "16px",
            border: "2px solid #ddd",
            [`${key}`]: "-1px",
            opacity: 0,
          }}
          type="source"
          position={value}
        />
      ))}

      <Handle
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          height: "100%",
          width: "100%",
          borderRadius: "0px",
          border: "0px solid",
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
        type="target"
        position={Position.Top}
        id="input"
        isConnectableStart={false}
      />
    </>
  );
};

export default ConnectionPoint;
