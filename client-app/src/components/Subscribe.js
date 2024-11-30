import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const Subscribe = () => {
    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Subscribe to Our Service
            </Typography>
            <Typography variant="body1" gutterBottom>
                Enjoy unlimited access to all avatars and features.
            </Typography>
            <Box mt={2}>
                <Button variant="contained" color="primary" size="large">
                    Subscribe Now
                </Button>
            </Box>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
                Pricing: $9.99/month
            </Typography>
        </Container>
    );
};

export default Subscribe; 