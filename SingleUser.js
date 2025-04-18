import React, { useState } from 'react';

const songs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    url: "/songs/blinding_lights.mp3" // You need to place MP3 files inside `public/songs/`
  },
  {
    id: 2,
    title: "Levitating",
    artist: "Dua Lipa",
    url: "/songs/levitating.mp3"
  }
];

const SingleUser = () => {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎧 Listen to Music & Play Game</h2>

      <div>
        {songs.map((song) => (
          <button
            key={song.id}
            onClick={() => setCurrentSong(song)}
            style={{ margin: '0.5rem' }}
          >
            {song.title} - {song.artist}
          </button>
        ))}
      </div>

      {currentSong && (
        <div>
          <h3>Now Playing: {currentSong.title}</h3>
          <audio controls autoPlay src={currentSong.url}></audio>
        </div>
      )}

      <hr />

      <MiniGame />
    </div>
  );
};

const MiniGame = () => {
  const [score, setScore] = useState(0);
  const handleClick = () => setScore(score + 1);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>🕹️ Mini Game: Click Counter</h2>
      <p>Score: {score}</p>
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
};

export default SingleUser;
