import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Login from './components/Login';
import Chat from './components/Chat'; // Add this line to import Chat
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/chat" element={<Chat />} /> {/* Ensure Chat is included here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;