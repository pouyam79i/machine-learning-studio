import createConnection from "../socket/socket";

const DEPLOY_API_ADDRESS = "localhost:8080/run";

let engineSocket = null;
/**
 * This function reduces object size of diagram data
 * before sending it to backend.
 * Also makes the data ready for backend.
 * @param {Array} nodes all nodes at run time.
 * @param {Array} edges all edges at run time.
 * @returns {String} data object is stringified.
 */
const prepareData = (nodes = [], edges = []) => {
  return JSON.stringify({
    nodes: nodes.map((node) => {
      let filtered_props = node.data.props
        ? node.data.props.filter((prop) => {
            return prop.tag !== "description";
          })
        : [];
      return {
        id: node.id,
        props: filtered_props.map((prop) => {
          return {
            tag: prop.tag,
            data: prop.data ? prop.data : "",
          };
        }),
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
const deploy = (data = {}, options = {}, attempt = 0) => {
  if (engineSocket == null || engineSocket.readyState != WebSocket.OPEN) {
    engineSocket = createConnection(DEPLOY_API_ADDRESS, options);
  }
  if (engineSocket.readyState == WebSocket.OPEN) {
    engineSocket.send(data);
  } else if (attempt < 10) {
    setTimeout(() => {
      console.log("trying to send...");
      deploy(data, options, attempt + 1);
    }, 1000);
  } else {
    console.log("send failed!");
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
