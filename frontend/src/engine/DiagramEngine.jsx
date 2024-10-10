// importing libs
import React, {
  createContext,
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
import { AppContext } from "../AppContext";
import { runDiagram } from "./engine";

const flowKey = "ml-studio/diagrams/last";

export const DiagramContext = createContext();

/**
 * this component contains necessary structure and functionalities for
 * ml studio diagram engine.
 * @returns a Diagram Engine for ML studio
 */
const DiagramEngineFlow = () => {
  // *************** app context
  const {
    useAppStatus: { appStatus, changeAppStatus },
    usePopUp: { showPopUp, setShowPopUp, changePopupData },
    useEngineStatus: { engineStatus, setEngineStatus },
    appNodesRelatedData: { appNodesDataChanger, setAppNodesDataChanger },
  } = useContext(AppContext);

  // ******************* Node and Edge related functions and hooks
  // Node types
  const nodeTypes = useMemo(() => ({ SimpleNode: SimpleNode }), []);
  // nodes list
  const [nodes, setNodes] = useState([]);
  // nodes for global ctx
  useEffect(() => {
    setAppNodesDataChanger({
      setNodes: setNodes,
    });
  }, []);

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

  // *************** save / load implementation
  const [rfInstance, setRfInstance] = useState(null); // react flow instance
  const { setViewport } = useReactFlow();

  /**
   * diagram saver
   */
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const diagramData = JSON.stringify(flow);
      localStorage.setItem(flowKey, diagramData);
      // TODO: save it using engine
    }
  }, [rfInstance]);

  /**
   * diagram loader
   */
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      // TODO: load it using engine
      const diagramData = localStorage.getItem(flowKey);
      const flow = JSON.parse(diagramData);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  // options
  const options = {
    popup: (data) => {
      data = JSON.parse(data);
      changePopupData(data["title"], data["data"], data["type"]);
      setShowPopUp(true);
    },
    alert: (data) => {
      alert(data);
    },
    status: (data) => {
      setEngineStatus(data);
    },
    node_status: (data) => {
      data = JSON.parse(data);
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id == data["node_hash"]) {
            return {
              ...node,
              data: {
                ...node.data,
                status: data["status"],
              },
            };
          } else return node;
        })
      );
    },
  };

  // Apply changes with side effect
  useEffect(() => {
    switch (appStatus) {
      case "save":
        onSave();
        break;
      case "load":
        onRestore();
        break;
      case "run":
        setNodes((nds) =>
          nds.map((node) => {
            return {
              ...node,
              data: {
                ...node.data,
                status: "inactive",
              },
            };
          })
        );
        runDiagram(nodes, edges, options, setEngineStatus);
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
        x: event.clientX || 0,
        y: event.clientY || 0,
      });

      const newNode = nodeFactory(type, position, data);

      event.dataTransfer.setData("application/test", JSON.stringify(newNode));

      setNodes((nodes) => nodes.concat(newNode));
    },
    [screenToFlowPosition]
  );

  return (
    <DiagramContext.Provider
      value={{
        nodeRelated: [nodes, setNodes],
        edgeRelated: [edges, setEdges],
      }}
    >
      <ReactFlow
        id="react-flow-container"
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setRfInstance}
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
    </DiagramContext.Provider>
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
