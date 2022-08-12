import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

// location of server
const ENDPOINT = 'localhost:5001';

//empty socket for connection
let socket;

const Board = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    // connect to socket
    socket = io.connect(ENDPOINT, { transports: ['websocket'] });
    console.log('connected');
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit('disconnect', { name, room });
      socket.off();
    };
  }, []);

  return (
    <div>
      <h1>Hallo</h1>
      <p>{room}</p>
      <p>{name}</p>
    </div>
  );
};
export default Board;
