import { useEffect } from "react";

export const runExample = (useNodes, useEdges, setShowPopUp) => {
  const { nodes, setNodes } = useNodes;
  const { edges, setEdges } = useEdges;
  console.log("running iris test!");
  console.log(nodes);

  // 1- run iris loader!
  setNodes(
    nodes.map((node) => {
      if (node.id == "cc8529b9-ad6c-4edb-9a14-c8236ca64abc")
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
        if (node.id == "cc8529b9-ad6c-4edb-9a14-c8236ca64abc")
          return {
            ...node,
            data: {
              ...node.data,
              status: "done",
            },
          };
        else if (node.id == "3bf501c9-32ab-4764-955e-98d6e4a7eaf8")
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
        if (node.id == "cc8529b9-ad6c-4edb-9a14-c8236ca64abc")
          return {
            ...node,
            data: {
              ...node.data,
              status: "done",
            },
          };
        else if (node.id == "3bf501c9-32ab-4764-955e-98d6e4a7eaf8")
          return {
            ...node,
            data: {
              ...node.data,
              status: "done",
            },
          };
        else if (node.id == "06d9604d-97d7-402c-b1d0-6848522432f2")
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
