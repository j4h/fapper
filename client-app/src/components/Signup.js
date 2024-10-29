import React, { useState } from 'react';
import api from '../api'; // Import the Axios instance
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css'; // Import the CSS file

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await api.post('/auth/register', { username, email, password });
      console.log('Signup successful', response.data);
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      setError('Signup failed. Please try again.');
      console.error('Signup failed', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {loading ? <p>Loading...</p> : <button type="submit">Signup</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;