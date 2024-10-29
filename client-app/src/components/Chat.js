import React, { useState } from 'react';
import api from '../api'; // Import the Axios instance
import './Chat.css'; // Import a CSS file for styling

function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    // Add the user's message to the chat history
    const newChatHistory = [...chatHistory, { sender: 'user', text: message }];
    setChatHistory(newChatHistory);
    
    // Clear the input field
    setMessage('');

    try {
      // Send the message to the OpenAI API
      const response = await api.post('/openai/chat', { message });
      const botReply = response.data.reply; // Adjust based on your backend response structure

      // Add the bot's reply to the chat history
      setChatHistory((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      setChatHistory((prev) => [...prev, { sender: 'bot', text: 'Error: Unable to get a response from the bot.' }]);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with Your Avatar</h2>
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className={chat.sender}>
            <strong>{chat.sender === 'user' ? 'You' : 'Bot'}:</strong> {chat.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;