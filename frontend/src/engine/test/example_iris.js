import { useEffect } from "react";

export const runExample = (useNodes, useEdges, setShowPopUp) => {
  const { nodes, setNodes } = useNodes;
  const { edges, setEdges } = useEdges;
  console.log("running iris test!");
  console.log(nodes);

  // 1- run iris loader!
  setNodes(
    nodes.map((node) => {
      if (node.id == "9a4d80e0-2040-48d1-9ae9-02bf8c4d0efc")
        return {
          ...node,
          data: {
            ...node.data,
            status: "active",
          },
        };
      else return node;
    })
  );

  // 2 - training model with knn
  setTimeout(() => {
    setNodes(
      nodes.map((node) => {
        if (node.id == "9a4d80e0-2040-48d1-9ae9-02bf8c4d0efc")
          return {
            ...node,
            data: {
              ...node.data,
              status: "done",
            },
          };
        else if (node.id == "9052724d-5739-4ebf-a946-18c7852dfced")
          return {
            ...node,
            data: {
              ...node.data,
              status: "active",
            },
          };
        else return node;
      })
    );
  }, 2000);

  // 3 - loading chart
  setTimeout(() => {
    setNodes(
      nodes.map((node) => {
        if (node.id == "9a4d80e0-2040-48d1-9ae9-02bf8c4d0efc")
          return {
            ...node,
            data: {
              ...node.data,
              status: "done",
            },
          };
        else if (node.id == "9052724d-5739-4ebf-a946-18c7852dfced")
          return {
            ...node,
            data: {
              ...node.data,
              status: "done",
            },
          };
        else if (node.id == "da8e0fd8-f5fa-4381-b927-14ce9e0083d6")
          return {
            ...node,
            data: {
              ...node.data,
              status: "active",
            },
          };
        else return node;
      })
    );
  }, 6000);

  // display popup chart
  setTimeout(() => {
    setNodes(
      nodes.map((node) => {
        return {
          ...node,
          data: {
            ...node.data,
            status: "done",
          },
        };
      })
    );
    setShowPopUp(true);
  }, 8000);
};
