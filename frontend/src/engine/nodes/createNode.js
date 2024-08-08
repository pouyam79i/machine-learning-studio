import { background } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

const NODE_SOURCE_URLs = ["import"];

const NODE_TARGET_URLs = ["charts"];

// ******************************    node builders. TODO add a factory method for builders
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

/**
 *
 * @param {*} url
 * @returns
 */
export const getNodePositionByUrl = (url = "/") => {
  let node_base_url = url.trim().split("/");
  if (node_base_url.length < 1) {
    console.log("no type for: " + url);
    return "no-type";
  }
  node_base_url = node_base_url[0];
  if (NODE_SOURCE_URL.indexOf(node_base_url) !== -1) {
    return "source";
  }
  if (NODE_TARGET_URLs.indexOf(node_base_url) !== -1) {
    return "target";
  }
  return "inner";
};

// ******************************    style related functions
/**
 *
 * @param {*} position
 * @returns
 */
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

/**
 *
 * @param {*} status
 * @param {*} position
 * @returns
 */
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

/**
 *
 * @param {*} status
 * @param {*} position
 * @returns
 */
export const nodeStyle = (status = "", position = "") => {
  return {
    borderColor: getNodeColorOnPosition(position),
    background: getNodeColorOnStatus(status, position),
  };
};
