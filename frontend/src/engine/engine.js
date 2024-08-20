import createConnection from "../socket/socket";

const DEPLOY_API_ADDRESS = "localhost:5000";

let engineSocket = null;
/**
 * This function reduces object size of diagram data
 * before sending it to backend.
 * Also makes the data ready for backend.
 * @param {Array} nodes all nodes at run time
 * @param {Array} edges all edges at run time
 */
const prepareData = (nodes = [], edges = []) => {
  return JSON.stringify({
    nodes: nodes.map((node) => {
      return {
        id: node.id,
        props: node.data.props,
        status: node.data.status,
        tag: node.data.tag,
      };
    }),
    edges: edges.map((edge) => {
      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
      };
    }),
  });
};

/**
 * This function deploys a connection between frontend and backend.
 * also updates ui if required
 * @param {Object} data ready data to send to backend.
 * @param {Object} options additional frontend options. like popups
 */
const deploy = (data = {}, options = {}) => {
  console.log(data);
  // create connection if not exists or dead.
  if (!engineSocket || engineSocket.readyState !== WebSocket.OPEN) {
    engineSocket = createConnection(DEPLOY_API_ADDRESS);
  }
  if (engineSocket.readyState == WebSocket.OPEN) {
    engineSocket.send(data);
    console.log("ml-ops deployed");
  } else {
    console.log("cannot deploy ml-ops");
  }
};

/**
 * This function handles running process.
 * @param {Array} nodes all nodes at run time
 * @param {Array} edges all edges at run time
 */
export const runDiagram = (nodes, edges, options = {}) => {
  let data = prepareData(nodes, edges, options);
  deploy(data);
};
