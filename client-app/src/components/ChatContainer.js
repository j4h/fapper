import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import ChatComponent from './ChatComponent';
import api from '../api'; // Ensure you have an API utility for making requests

const ChatContainer = ({ selectedAvatar }) => {
    const { user, setUser } = useContext(UserContext);
    const [chatHistories, setChatHistories] = React.useState(user.chatHistories); // Use user's chat histories

    useEffect(() => {
        // Update local state when user chatHistories change
        setChatHistories(user.chatHistories);
    }, [user.chatHistories]);

    const handleSendMessage = async (message) => {
        if (user.coins > 0) {
            // Ensure chatHistories for the selected avatar is initialized
            const currentChatHistory = chatHistories[selectedAvatar.id] || [];
            const newChatHistory = [
                ...currentChatHistory,
                { sender: 'user', text: message },
            ];
            setChatHistories((prev) => ({
                ...prev,
                [selectedAvatar.id]: newChatHistory,
            }));

            // Update user state with new chat histories
            setUser((prev) => ({
                ...prev,
                chatHistories: {
                    ...prev.chatHistories,
                    [selectedAvatar.id]: newChatHistory,
                },
            }));

            // Deduct 1 coin
            setUser((prev) => ({ ...prev, coins: prev.coins - 1 }));

            try {
                const response = await api.post('/api/chat', {
                    message,
                    userId: user.id,
                    avatarId: selectedAvatar.id,
                });
                const { reply } = response.data;

                // Update chat history with bot reply
                const updatedChatHistory = [
                    ...newChatHistory,
                    { sender: 'bot', text: reply },
                ];

                setChatHistories((prev) => ({
                    ...prev,
                    [selectedAvatar.id]: updatedChatHistory,
                }));

                // Save updated chat history to the database
                await api.put(`/api/users/${user.id}/chat-histories`, {
                    avatarId: selectedAvatar.id,
                    messages: updatedChatHistory,
                });
            } catch (error) {
                console.error('Error communicating with OpenAI:', error);
                setChatHistories((prev) => ({
                    ...prev,
                    [selectedAvatar.id]: [
                        ...prev[selectedAvatar.id] || [], // Ensure it's initialized
                        { sender: 'bot', text: 'Error: Unable to get a response from the bot.' },
                    ],
                }));
            }
        } else {
            alert("Not enough coins!");
        }
    };

    return (
        <ChatComponent 
            onSendMessage={handleSendMessage} 
            chatHistory={chatHistories[selectedAvatar.id] || []} 
        />
    );
};

export default ChatContainer; 