import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const DiagramEngine = () => {
  // node hook
  const [nodes, setNodes, onNodesChange] = useNodesState();
  // edge hook
  const [edges, setEdges, onEdgesChange] = useEdgesState();
  // TODO: callback for nodes-connecting events
  const onConnect = useCallback();
  // TODO: callback for nodes-disconnecting events
  const onDisconnect = useCallback();
  // TODO: callback for node-prop-changing events
  const onChange = useCallback();

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
};

export default DiagramEngine;
