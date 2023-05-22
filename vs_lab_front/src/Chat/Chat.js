import React, { useState, useEffect, useRef } from 'react';

export function Chat(props) {
    const [username] = useState(props.username);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const messageContainerRef = useRef(null);
    const shouldScrollToBottomRef = useRef(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (shouldScrollToBottomRef.current) {
            scrollToBottom();
        }
    }, [chatMessages]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API + 'chatmessage'); // Replace '/api/messages' with the actual API endpoint URL
            const data = await response.json();
            setChatMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            await fetch(process.env.REACT_APP_API + 'chatmessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { message, username }
                ),});
            setMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
        const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
        shouldScrollToBottomRef.current = isScrolledToBottom;
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '12vh' }}>
                <h1>Welcome to the chat page, {props.username}</h1>
            </div>
            <div className="row" style={{ height: '76vh' }}>
                <div className="col-8 offset-2">
                    <div
                        className="message-container"
                        style={{
                            maxHeight: '400px',
                            flex: '1',
                            overflowY: 'auto',
                            padding: '10px',
                            marginBottom: '20px',
                            height: '100%',
                        }}
                        ref={messageContainerRef}
                        onScroll={handleScroll}
                    >
                        {chatMessages.map((msg, index) => (
                            <div
                                className={`message ${msg.username === props.username ? 'sent' : 'received'}`}
                                key={index}
                                style={{
                                    marginBottom: '8px',
                                    borderRadius: '10px',
                                    padding: '8px',
                                    backgroundColor: msg.username === props.username ? '#dcf8c6' : '#f3f3f3',
                                    textAlign: msg.username === props.username ? 'right' : 'left',
                                }}
                            >
                                <div className="message-content">
                                    <p className="username small font-weight-bold" style={{ marginBottom: '4px' }}>
                                        {msg.username}
                                    </p>
                                    <p className="content" style={{ margin: '0' }}>
                                        {msg.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && message.trim() !== '') {
                                    sendMessage();
                                }
                            }}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={sendMessage} disabled={message.trim() === ''}>
                                <i className="bi bi-arrow-right-circle-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
