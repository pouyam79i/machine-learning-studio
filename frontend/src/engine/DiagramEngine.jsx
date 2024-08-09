// importing libs
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getNodeColorOnStatus, nodeFactory } from "./nodes/createNode";
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
import { Context } from "../App";
import { runDiagram, saveDiagram } from "./engine";

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

  // hook diagram data with side effect:
  const {
    useDiagramData: { setDiagramData },
    useAppStatus: { appStatus, changeAppStatus },
  } = useContext(Context);
  useEffect(() => {
    switch (appStatus) {
      case "save":
        saveDiagram(nodes, edges);
        break;
      case "run":
        runDiagram(nodes, edges);
        break;
    }
    changeAppStatus("dev");
  }, [appStatus]);

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

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = nodeFactory(type, position, data);

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
      <MiniMap
        nodeColor={(node) => {
          return getNodeColorOnStatus(node.data.status, node.data.post);
        }}
        nodeStrokeWidth={"3px"}
        nodeBorderRadius={"16px"}
        zoomable
        pannable
      />
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
