import React, { useState, useContext, useEffect, useRef } from 'react';
import api from '../api';
import { UserContext } from '../context/UserContext';
import { Button, TextField, Typography, Container, Box, Card, CardContent, Snackbar } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import './Chat.css';

function Chat() {
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [chatHistories, setChatHistories] = useState({});
    const chatEndRef = useRef(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [error, setError] = useState(null);

    const avatars = [
        { id: 1, name: 'Avatar 1' },
        { id: 2, name: 'Avatar 2' },
        // Add more avatars as needed
    ];

    useEffect(() => {
        const fetchChatHistory = async () => {
            if (selectedAvatar && user) {
                try {
                    // Fetching chat histories for the user
                    const response = await api.get(`/users/${user.id}/chat-histories`);
                    console.log('Response:', response); // Check what the response contains

                    // Ensure the response has chatHistories
                    const userChatHistories = response.data.chatHistories; // Check if this is defined

                    setChatHistories((prev) => ({
                        ...prev,
                        [selectedAvatar.id]: userChatHistories[selectedAvatar.id] || [],
                    }));
                } catch (error) {
                    console.error('Error fetching chat history:', error);
                    setError('Failed to fetch chat history. Please try again later.');
                }
            }
        };

        fetchChatHistory();
    }, [user.id, selectedAvatar]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistories[selectedAvatar?.id]]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message || !selectedAvatar) return;

        const newChatHistory = [...(chatHistories[selectedAvatar.id] || []), { sender: 'user', text: message }];
        setChatHistories((prev) => ({
            ...prev,
            [selectedAvatar.id]: newChatHistory,
        }));
        setMessage('');

        try {
            const response = await api.post('/openai/chat', {
                message,
                userId: user.id,
            });
            const { reply } = response.data;

            setChatHistories((prev) => ({
                ...prev,
                [selectedAvatar.id]: [
                    ...prev[selectedAvatar.id],
                    { sender: 'bot', text: reply },
                ],
            }));
        } catch (error) {
            console.error('Error communicating with OpenAI:', error);
            setChatHistories((prev) => ({
                ...prev,
                [selectedAvatar.id]: [
                    ...prev[selectedAvatar.id],
                    { sender: 'bot', text: 'Error: Unable to get a response from the bot.' },
                ],
            }));
        }
    };

    return (
        <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Header coins={user.coins} />
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden',  }}>
                <Sidebar avatars={avatars} onSelectAvatar={setSelectedAvatar} />
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Chat with {selectedAvatar ? selectedAvatar.name : 'Your Avatar'}
                    </Typography>
                    <div className="chat-history">
                        {(chatHistories[selectedAvatar?.id] || []).map((chat, index) => (
                            <Card key={index} className={chat.sender}>
                                <CardContent>
                                    <Typography variant="body1">
                                        <strong>{chat.sender === 'user' ? 'You' : 'Bot'}:</strong> {chat.text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="chat-form">
                        <TextField
                            label="Type your message..."
                            variant="outlined"
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                            Send
                        </Button>
                    </form>
                </div>
            </div>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                message={error}
            />
        </Container>
    );
}

export default Chat;