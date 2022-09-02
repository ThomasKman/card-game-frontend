import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

// location of server
const ENDPOINT = 'localhost:5001';

//empty socket for connection
let socket;

const Board = () => {
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomInfo, setRoomInfo] = useState({
    gamemode: '',
    name: '',
    seatCount: '',
    users: [],
  });
  const location = useLocation();

  useEffect(() => {
    const { userName, roomName } = queryString.parse(location.search);

    // connect to socket
    socket = io.connect(ENDPOINT, { transports: ['websocket'] });
    console.log('connected');
    setUserName(userName);
    setRoomName(roomName);

    socket.emit('joinRoom', { userName, roomName }, (error) => {
      if (error) {
        alert(error);
      }

      socket.emit('updateRooms');
    });

    socket.on('updateRoom', (roomInfo) => {
      setRoomInfo(roomInfo);
      console.log(roomInfo);
    });

    return () => {
      socket.emit('leaveRoom', { userName, roomName });
      socket.emit('disconnect', {});
      socket.off();
    };
  }, []);

  return (
    <div className="board">
      <h1>Hallo</h1>
      <p>{userName}</p>
      <p>{roomName}</p>
      <p>{roomInfo.gamemode}</p>
      <p>
        {roomInfo?.users.length}/{roomInfo.seatCount}
      </p>
      {roomInfo?.users?.map((user) => {
        return <p>{user.name}</p>;
      })}
    </div>
  );
};
export default Board;
