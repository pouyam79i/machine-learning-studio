/**
 * This function reduces object size of diagram data
 * before sending it to backend.
 * Also makes the data ready for backend.
 * @param {Array} nodes all nodes at run time
 * @param {Array} edges all edges at run time
 */
const prepareData = (nodes = [], edges = []) => {
  return {
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
  };
};

/**
 * This function deploys a connection between frontend and backend.
 * also updates ui if required
 * @param {Object} data ready data to send to backend.
 * @param {Object} options additional frontend options. like popups
 */
const deploy = (data = {}, options = {}) => {
  console.log(data);
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
