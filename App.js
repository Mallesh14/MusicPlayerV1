import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SingleUser from './components/SingleUser';
import MultiUser from './components/MultiUser';
import Room from './components/Room';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single" element={<SingleUser />} />
        <Route path="/multi" element={<MultiUser />} />
        <Route path="/room/:code" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;
