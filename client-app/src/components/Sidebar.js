import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({ avatars, onSelectAvatar }) => {
    return (
        <div style={{ width: '200px', borderRight: '1px solid #ccc', height: '100vh', overflowY: 'auto' }}>
            <List>
                {avatars.map((avatar) => (
                    <ListItem button key={avatar.id} onClick={() => onSelectAvatar(avatar)}>
                        <ListItemText primary={avatar.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Sidebar; 