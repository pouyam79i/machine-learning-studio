import { v4 as uuid } from "uuid";

export const createSimpleNode = (title = "", tag = "") => {
  let newNode = {
    id: uuid(), // TODO: generate uuid
    type: "SimpleNode",
    position: { x: 0, y: 0 },
    data: {
      title: title,
      status: "inactive", // we have: inactive, active, disabled, done.
      tag: tag,
    },
  };
  return {
    id: newNode.id,
    node: newNode,
  };
};
