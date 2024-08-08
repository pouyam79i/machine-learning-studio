// importing libs
import React, { useCallback, useMemo, useState } from "react";
import { createSimpleNode } from "./nodes/createNode";
import SimpleNode from "./nodes/SimpleNode";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";

// importing styles
import "@xyflow/react/dist/style.css";
import "./nodes/node-style.css";

const DiagramEngine = () => {
  // TODO : remove test **********

  const initialNodes = [
    createSimpleNode("Title", "label", "tag").node,
    createSimpleNode("Title", "label", "tag").node,
  ];

  // end of test *****************

  // Node types
  const nodeTypes = useMemo(() => ({ SimpleNode: SimpleNode }), []);
  // nodes list
  const [nodes, setNodes] = useState(initialNodes);
  // edges list
  const [edges, setEdges] = useState([]);

  // handle node changes
  const onNodesChange = useCallback(
    (changes) => {
      setNodes((oldNodes) => applyNodeChanges(changes, oldNodes));
    },
    [setNodes]
  );
  // handle edge changes
  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
    },
    [setEdges]
  );
  // handle adding new connections
  const onConnect = useCallback(
    (connection) => {
      setEdges((oldEdges) => addEdge(connection, oldEdges));
    },
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Controls />
      <MiniMap nodeStrokeWidth={3} zoomable pannable />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
};

export default DiagramEngine;
