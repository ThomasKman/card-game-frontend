import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import io from 'socket.io-client';

// location of server
const ENDPOINT = 'localhost:5001';

//empty socket for connection
let socket;

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // connect to socket
    socket = io.connect(ENDPOINT, { transports: ['websocket'] });

    socket.emit('joinLobby', {});

    socket.on('updateRooms', (roomList) => {
      console.log(roomList);
      setRooms(roomList);
    });

    console.log(rooms);

    return () => {
      socket.emit('disconnect', {});
      socket.off();
    };
  }, []);

  const createRoom = (event) => {
    console.log('room created: ' + name);
    socket.emit('createRoom', room);
  };

  return (
    <>
      <div className="header">
        <h1 className="heading">Heinrich Hearts - Card Games</h1>
      </div>
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <div className="optionContainer">
            <h2 className="heading">Name</h2>

            <input
              placeholder="Name"
              className="joinInput mt-20"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="optionContainer">
            <h2 className="heading">Join Room</h2>

            <select
              className="joinInput mt-20"
              id="rooms"
              onChange={(event) => setRoom(event.target.value)}
            >
              {rooms.length === 0 && (
                <option value="none">kein Spiel verfügbar</option>
              )}
              {rooms.map((room) => (
                <option value={room.name}>
                  {room.name} - {room.gamemode} - {room.users.length}/
                  {room.seatCount}
                </option>
              ))}
            </select>
            <a
              onClick={(event) =>
                !name || !room ? event.preventDefault() : null
              }
              href={'/board/?name=' + name + '&room=' + room}
            >
              <button className="button mt-20" type="submit">
                Join Room
              </button>
            </a>
          </div>
          <div className="optionContainer">
            <h2 className="heading">Create Room</h2>
            <div>
              <input
                placeholder="Room-Name"
                className="joinInput mt-20"
                type="text"
                onChange={(event) => setRoom(event.target.value)}
              />
              <a
                onClick={(event) =>
                  !name || !room ? event.preventDefault() : createRoom(event)
                }
                href={'/board/?name=' + name + '&room=' + room}
              >
                <button className="button mt-20" type="submit">
                  Create Room
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Join;
