import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>🎵 Welcome to the Music App 🎮</h1>
      <button onClick={() => navigate('/single')} style={btnStyle}>Single User Mode</button>
      <button onClick={() => navigate('/multi')} style={btnStyle}>Multi User Mode</button>
    </div>
  );
};

const btnStyle = {
  margin: '1rem',
  padding: '1rem 2rem',
  fontSize: '1.2rem',
  cursor: 'pointer'
};

export default Home;
