import { background } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

/**
 * this function creates an instance of simple node
 * @param {string} title
 * @param {string} tag
 * @returns a simple node object
 */
export const createSimpleNode = (title = "", tag = "", position = "inner") => {
  let newNode = {
    id: uuid(), // TODO: generate uuid
    type: "SimpleNode",
    position: { x: 0, y: 0 },
    data: {
      title: title,
      status: "inactive", // we have: inactive (default), active, disabled, done.
      tag: tag,
      position: position,
    },
  };
  return {
    id: newNode.id,
    node: newNode,
  };
};

export const getNodeColorOnPosition = (position = "") => {
  switch (position) {
    case "source":
      return "var(--source-node-color)";
    case "target":
      return "var(--target-node-color)";
    default: // inner and others
      return "var(--default-node-color)";
  }
};

export const getNodeColorOnStatus = (status, position) => {
  switch (status) {
    case "active":
      return getNodeColorOnPosition(position);
    case "disabled":
      return "var(--disabled-node-color)";
    case "done":
      return "var(--done-node-color)";
    default:
      return "var(--inactive-node-color)";
  }
};

export const nodeStyle = (status = "", position = "") => {
  return {
    borderColor: getNodeColorOnPosition(position),
    background: getNodeColorOnStatus(status, position),
  };
};
