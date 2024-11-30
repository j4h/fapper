import React, { useState, useContext } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import './Login.css';

function Login() {
    const { login } = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;
            const expirationTime = new Date().getTime() + 3600000; // 1 hour
            localStorage.setItem('tokenExpiration', expirationTime);
            login({ username: user.username, coins: user.coins, token, id: user.id, chatHistory: user.chatHistory });
            navigate('/profile');
        } catch (error) {
   
            setError('An unexpected error occurred.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </form>
            </Box>
        </Container>
    );
}

export default Login;