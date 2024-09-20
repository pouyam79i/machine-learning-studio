/**
 *  creates a new socket for full-duplex communication.
 * @param {*} address should be like: 'localhost:8080'
 * @param {*} options how to handle received msg data.
 * @returns socket
 */
const createConnection = (address = "127.0.0.1:8080/run", options = {}) => {
  const socket = new WebSocket("ws://" + address);

  // on open connection
  socket.onopen = () => {
    console.log("Connected to the server");
  };

  socket.onerror = () => {
    console.log("error in ws");
  };

  // on receiving msg
  socket.onmessage = (event) => {
    console.log(event.data);
    // passing data to options
    if (event.data.type && options[event.data.type]) {
      options[event.data.type](event.data.data);
    }
  };

  // on close connection
  socket.onclose = () => {
    console.log("Disconnected from the server");
  };

  return socket;
};

export default createConnection;
