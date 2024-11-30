import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import './Home.css';

function Home() {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Welcome to FAPPER
            </Typography>
            <Typography variant="h6" gutterBottom>
                Fap-fap with your virtual avatars!
            </Typography>
            <Button variant="contained" color="primary" href="/login" sx={{ mr: 2 }}>
                Login
            </Button>
            <Button variant="outlined" color="primary" href="/register">
                Sign Up
            </Button>
        </Container>
    );
}

export default Home;