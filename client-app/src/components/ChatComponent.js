import React from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';

const ChatComponent = ({ onSendMessage, chatHistory }) => {
    const [message, setMessage] = React.useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <Card variant="outlined" style={{ margin: '20px', padding: '20px' }}>
            <CardContent>
                <Typography variant="h5" component="div" style={{ marginBottom: '10px' }}>
                    Chat with AI
                </Typography>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {chatHistory.map((msg, index) => (
                        <Typography key={index} variant="body1">{msg}</Typography>
                    ))}
                </div>
                <TextField
                    label="Type your message"
                    variant="outlined"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSend}
                    style={{ width: '100%' }}
                >
                    Send
                </Button>
            </CardContent>
        </Card>
    );
};

export default ChatComponent; 