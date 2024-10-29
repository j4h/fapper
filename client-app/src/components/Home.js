import React from 'react';
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home-container"> {/* Apply the home-container class */}
      <h1>Welcome to GPT Avatar App</h1>
      <p>Chat with your virtual avatars!</p>
      <a href="/login">Login</a>
      <a href="/register">Sign Up</a>
    </div>
  );
}

export default Home;