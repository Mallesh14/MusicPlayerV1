import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MultiUser = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const createRoom = async () => {
    const res = await axios.post('http://localhost:5000/api/room/create');
    navigate(`/room/${res.data.roomCode}`);
  };

  const joinRoom = async () => {
    try {
      await axios.post('http://localhost:5000/api/room/join', { roomCode });
      navigate(`/room/${roomCode}`);
    } catch (err) {
      alert('Room not found!');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h2>👥 Multi User Mode</h2>

      <button onClick={createRoom} style={btnStyle}>Create Room</button>

      <div>
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          style={{ padding: '0.5rem', marginTop: '1rem' }}
        />
        <button onClick={joinRoom} style={btnStyle}>Join Room</button>
      </div>
    </div>
  );
};

const btnStyle = {
  margin: '1rem',
  padding: '1rem 2rem',
  fontSize: '1rem',
  cursor: 'pointer'
};

export default MultiUser;
