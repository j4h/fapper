import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Profile
                </Typography>
                <Typography variant="h6">Username: {user?.username}</Typography>
                <Typography variant="h6">Coins: {user?.coins}</Typography>
                <Button variant="contained" color="primary" onClick={logout}>
                    Logout
                </Button>
                <Button variant="outlined" color="primary" onClick={() => navigate('/chat')} sx={{ ml: 2 }}>
                    Go to Chat
                </Button>
            </Box>
        </Container>
    );
}

export default Profile;