import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = ({ coins }) => {
    return (
        <AppBar position="static">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">
                    Chat with Your Avatar
                </Typography>
                <div>
                    <Typography variant="body1" style={{ marginRight: '20px' }}>
                        Coins: {coins}
                    </Typography>
                    <Button color="inherit" component={Link} to="/profile">Profile</Button>
                    <Button color="inherit" component={Link} to="/subscribe">Subscribe</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header; 