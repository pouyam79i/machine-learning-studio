// importing libs
import React, { useCallback, useMemo, useState } from "react";
import { nodeFactory } from "./nodes/createNode";
import SimpleNode from "./nodes/SimpleNode";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";

// importing styles
import "@xyflow/react/dist/style.css";
import "./nodes/node-style.css";

/**
 * this component contains necessary structure and functionalities for
 * ml studio diagram engine.
 * @returns a Diagram Engine for ML studio
 */
const DiagramEngineFlow = () => {
  // ******************* Node and Edge related functions and hooks
  // Node types
  const nodeTypes = useMemo(() => ({ SimpleNode: SimpleNode }), []);
  // nodes list
  const [nodes, setNodes] = useState([]);
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

  // ************** drag and drop functions:
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const args = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      const type = args.type;
      const data = args.data;

      console.log(args);

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = nodeFactory(type, position, data);

      console.log(newNode);

      setNodes((nodes) => nodes.concat(newNode));
    },
    [screenToFlowPosition]
  );

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onDrop={onDrop}
      onDragOver={onDragOver}
      fitView
    >
      <Controls />
      <MiniMap nodeStrokeWidth={3} zoomable pannable />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
};

const DiagramEngine = () => {
  return (
    <ReactFlowProvider>
      <DiagramEngineFlow />
    </ReactFlowProvider>
  );
};

export default DiagramEngine;
