import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const songs = [
  {
    title: "Blinding Lights",
    url: "Just-An-Ordinary-Person-Bgm-Ringtone-1.mp3"
  },
  {
    title: "Levitating",
    url: "/songs/levitating.mp3"
  }
];

const Room = () => {
  const { code } = useParams();
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [players, setPlayers] = useState([]);
  const audioRef = useRef();

  useEffect(() => {
    const user = prompt("Enter your name:");
    setUsername(user);

    socket.emit('joinRoom', { roomCode: code, username: user });

    socket.on('userJoined', ({ user }) => {
      setPlayers((prev) => [...new Set([...prev, user])]);
      setChatLog((prev) => [...prev, `${user} joined the room.`]);
    });

    socket.on('receiveChat', ({ user, message }) => {
      setChatLog((prev) => [...prev, `${user}: ${message}`]);
    });

    return () => {
      socket.disconnect();
    };
  }, [code]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendChat', { roomCode: code, message, username });
      setMessage('');
    }
  };

  const playSong = (song) => {
    setSelectedSong(song);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎶 Room Code: <code>{code}</code></h2>
      <p>👥 Players: {players.join(', ') || "Waiting for others..."}</p>

      <hr />

      <div style={{ marginBottom: '2rem' }}>
        <h3>🎧 Shared Music Player</h3>
        {songs.map((song, index) => (
          <button key={index} onClick={() => playSong(song)} style={{ marginRight: '1rem' }}>
            {song.title}
          </button>
        ))}
        {selectedSong && (
          <div>
            <p>Now Playing: {selectedSong.title}</p>
            <audio ref={audioRef} controls autoPlay src={selectedSong.url}></audio>
          </div>
        )}
      </div>

      <hr />

      <div style={{ marginBottom: '2rem' }}>
        <h3>💬 Chat</h3>
        <div style={{ border: '1px solid #ccc', height: '150px', overflowY: 'scroll', padding: '1rem' }}>
          {chatLog.map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{ width: '60%', marginTop: '1rem', marginRight: '0.5rem' }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <hr />

      <MiniGame />
    </div>
  );
};

const MiniGame = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div>
      <h3>🎮 Multiplayer Clicker Game</h3>
      <p>Player 1 Score: {count1}</p>
      <button onClick={() => setCount1(count1 + 1)}>Player 1 Click</button>

      <p>Player 2 Score: {count2}</p>
      <button onClick={() => setCount2(count2 + 1)}>Player 2 Click</button>
    </div>
  );
};

export default Room;
