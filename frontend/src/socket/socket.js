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
    const data = JSON.parse(event.data);
    console.log(data);
    // passing data to options
    if (data.type && options[data.type]) {
      options[data.type](data.data);
    }
  };

  // on close connection
  socket.onclose = () => {
    console.log("Disconnected from the server");
    if (options["status"]) options["status"]({ message: "Disconnected" });
  };

  return socket;
};

export default createConnection;
