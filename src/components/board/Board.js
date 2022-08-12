import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// location of server
const ENDPOINT = 'localhost:5001';

//empty socket for connection
let socket;

const Board = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      // connect to socket
      socket = io.connect(ENDPOINT, { transports: ['websocket'] });
      console.log('connected');
      setIsConnected(true);
    }
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat message', 'ping');
  };

  return (
    <div>
      <ul id="messages"></ul>
      <form id="form" action="">
        <input id="input" autocomplete="off" />
        <button
          onClick={(e) => {
            sendMessage(e);
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};
export default Board;
