import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export function Chat(props) {
    const [username] = useState(props.username);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    // Connect to the WebSocket server
    const socket = io('http://localhost:3000');

    useEffect(() => {
        // Handle incoming messages
        socket.on('message', (message) => {
            setChatMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const sendMessage = () => {
        const newMessage = { username, message };

        // Update the chatMessages state with the new message
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);

        // Send the message to the WebSocket server
        socket.emit('message', newMessage);

        // Clear the input field
        setMessage('');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Welcome, {username}!</h1>
            <div className="message-container mb-4">
                {chatMessages.map((msg, index) => (
                    <p key={index}>
                        {msg.username}: {msg.message}
                    </p>
                ))}
            </div>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button className="btn btn-primary" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}
