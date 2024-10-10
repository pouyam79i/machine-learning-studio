import { useCallback, useContext, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { nodeStyle } from "./createNode";
import { AppContext } from "../../AppContext";
import { DiagramContext } from "../DiagramEngine";

import React from "react";

const SimpleNode = ({ data }) => {
  const [isValueChanged, setIsValueChanged] = useState(false);

  const {
    nodeRelated: [nodes, setNodes],
  } = useContext(DiagramContext);

  const onChange = useCallback(() => {
    setIsValueChanged(true);
  }, []);

  const onKeyDown = useCallback((evt) => {
    if (evt.code == "Enter") {
      setIsValueChanged(false);
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === data.id) {
            return {
              ...node,
              data: {
                ...node.data,
                label: evt.target.value,
              },
            };
          }

          return node;
        })
      );
    }
  }, []);

  const {
    useItem: { changeSelectedItem },
  } = useContext(AppContext);

  return (
    <div
      className="default-node-style simple-node node-container"
      style={nodeStyle(data.status, data.post)}
      onClick={() => {
        changeSelectedItem(data);
      }}
    >
      {data.post !== "source" && (
        <Handle type="source" position={Position.Left} />
      )}
      {data.title && <h5 className="title">{data.title}</h5>}
      <div>
        <input
          name="text"
          placeholder="Your label..."
          onKeyDown={onKeyDown}
          className="nodrag"
          defaultValue={data.label}
          onChange={onChange}
          style={{ border: isValueChanged ? "1px solid red" : "none" }}
        />
      </div>

      {data.post !== "target" && (
        <Handle type="target" position={Position.Right} />
      )}
    </div>
  );
};

export default SimpleNode;
