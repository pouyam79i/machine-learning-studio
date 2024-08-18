import { background, position } from "@chakra-ui/react";
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
export const createSimpleNode = (
  position = { x: 0, y: 0 },
  data = { title: "", tag: "", post: "inner", props: {} }
) => {
  const id = uuid();
  const newNode = {
    id: id, // TODO: generate uuid
    type: "SimpleNode",
    position: position,
    data: {
      id: id,
      title: data.title,
      status: "inactive", // we have: inactive (default), active, disabled, done.
      tag: data.tag,
      post: data.post,
      props: data.props,
      isNode: true, // it will be used to distinguish nodes from items
      label: "", // save the label value here.
    },
  };
  return newNode;
};

/**
 * this is a factory method for creating nodes.
 * default values give a SimpleNode.
 * @param {string} type of node
 * @param {object} data contains required info for node.
 * @returns
 */
export const nodeFactory = (
  type = "SimpleNode",
  position = { x: 0, y: 0 },
  data = { title: "", tag: "", post: "" }
) => {
  if (type === "SimpleNode") {
    return createSimpleNode(position, data);
  }
  throw new Error("node type is not defined in node factory!");
};

/**
 *
 * @param {*} url
 * @returns
 */
export const getNodePostByUrl = (url = "/") => {
  let node_base_url = url.trim().split("/");

  if (node_base_url.length < 1) {
    console.log("no type for: " + url);
    return "no-type";
  }

  let pointer = node_base_url.indexOf("tools");

  if (pointer == node_base_url.length - 1) {
    console.log("general type for: " + url);
    return "tools";
  }

  node_base_url = node_base_url[pointer + 1];
  if (NODE_SOURCE_URLs.indexOf(node_base_url) !== -1) {
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
 * @param {*} post
 * @returns
 */
export const getNodeColorOnPosition = (post = "") => {
  switch (post) {
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
 * @param {*} post
 * @returns
 */
export const getNodeColorOnStatus = (status, post) => {
  switch (status) {
    case "active":
      return getNodeColorOnPosition(post);
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
 * @param {*} post
 * @returns
 */
export const nodeStyle = (status = "", post = "") => {
  return {
    borderColor: getNodeColorOnPosition(post),
    background: getNodeColorOnStatus(status, post),
  };
};
