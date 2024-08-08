import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { nodeStyle } from "./createNode";

import React from "react";

const SimpleNode = ({ data }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div
      className="default-node-style simple-node node-container"
      style={nodeStyle(data.status, data.post)}
    >
      {data.post !== "source" && (
        <Handle type="source" position={Position.Left} />
      )}
      {data.title && <h5 className="title">{data.title}</h5>}
      <div>
        <input
          name="text"
          placeholder="Your label..."
          onChange={onChange}
          className="nodrag"
        />
      </div>

      {data.post !== "target" && (
        <Handle type="target" position={Position.Right} />
      )}
    </div>
  );
};

export default SimpleNode;
