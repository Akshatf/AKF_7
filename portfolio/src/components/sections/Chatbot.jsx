import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import styled from "styled-components";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hi! Ask me anything about Akshat.' },
        { type: 'bot', text: 'Ask me about Akshat, his qualification, and much more!' },
        { type: 'bot', text: 'Please share your valuable feedback at the end of the conversation.' }
    ]);
    const [input, setInput] = useState('');
    const [editing, setEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessages] = useState(['Fetching data...', 'Analyzing...', 'Generating response...']);
    const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);
    const [chatbotOpen, setChatbotOpen] = useState(false);
    const [botResponding, setBotResponding] = useState(false);
    const messagesEndRef = useRef(null);
    const [showFirstMessage, setShowFirstMessage] = useState(false);
    const [showSecondMessage, setShowSecondMessage] = useState(false);
    const [hideMessages, setHideMessages] = useState(false);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        resetMessagesEffect();
    }, []);

    const resetMessagesEffect = () => {
        setShowFirstMessage(false);
        setShowSecondMessage(false);
        setHideMessages(false);

        const firstMessageTimer = setTimeout(() => {
            setShowFirstMessage(true);
        }, 1000);

        const secondMessageTimer = setTimeout(() => {
            setShowSecondMessage(true);
        }, 3000);

        const hideMessagesTimer = setTimeout(() => {
            setHideMessages(true);
        }, 6500);

        return () => {
            clearTimeout(firstMessageTimer);
            clearTimeout(secondMessageTimer);
            clearTimeout(hideMessagesTimer);
        };
    };

    const handleInputChange = (e) => setInput(e.target.value);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const newMessages = [...messages];
        if (editing) {
            newMessages[editIndex].text = input;
            setEditing(false);
            setEditIndex(null);
        } else {
            newMessages.push({ type: 'user', text: input });
        }

        setMessages(newMessages);
        setInput('');
        setLoading(true);
        setCurrentLoadingIndex(0);

        const loadingInterval = setInterval(() => {
            setCurrentLoadingIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 1200);

        try {
            const response = await fetch('https://akf-7.onrender.com/send-msg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ MSG: input }),
            });

            clearInterval(loadingInterval);

            const data = await response.json();
            const botResponse = data.Reply || "Sorry, I didn't understand that.";

            setLoading(false);
            typeWriterEffect(botResponse);
        } catch (error) {
            clearInterval(loadingInterval);
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'bot', text: 'Error: Unable to connect to the server. Please refresh or try again later.' },
            ]);
            setLoading(false);
        }
    };

    const typeWriterEffect = (text) => {
        let index = 0;
        const newBotMessage = { type: 'bot', text: '', partial: true };

        setMessages((prevMessages) => [...prevMessages, newBotMessage]);

        setBotResponding(true);

        const interval = setInterval(() => {
            index++;
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                const lastMessageIndex = updatedMessages.length - 1;

                if (lastMessageIndex >= 0 && updatedMessages[lastMessageIndex].partial) {
                    updatedMessages[lastMessageIndex].text = text.slice(0, index);
                }

                return updatedMessages;
            });

            if (index === text.length) {
                clearInterval(interval);

                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    const lastMessageIndex = updatedMessages.length - 1;

                    if (lastMessageIndex >= 0 && updatedMessages[lastMessageIndex].partial) {
                        updatedMessages[lastMessageIndex].partial = false;
                    }

                    return updatedMessages;
                });

                setBotResponding(false);
                scrollToBottom();
            }
        }, 50);
    };

    const editMessage = (index) => {
        setEditing(true);
        setEditIndex(index);
        setInput(messages[index].text);

        setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const nextMessageIndex = index + 1;

            if (updatedMessages[nextMessageIndex] && updatedMessages[nextMessageIndex].type === 'bot') {
                updatedMessages.splice(nextMessageIndex, 1);
            }

            return updatedMessages;
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const resetChat = () => {
        setMessages([{ type: 'bot', text: 'Hi! Ask me anything about Akshat.' }]);
    };

    const BotButton = styled.button`
        position: fixed;
        bottom: 30px;
        right: 30px;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.primary || "#6C63FF"};
        color: white;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        cursor: pointer;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        z-index: 10;
        &:hover {
            transform: scale(1.5);
            transition: all 0.3s ease;
            background: transparent;
        }
    `;

    return (
        <>
            <div className="chatbot-wrapper">
                {!chatbotOpen && (
                    <>
                        {!hideMessages && (
                            <div className="chatbot-messages">
                                {showFirstMessage && (
                                    <div className="chatbot-message chatbot-message-first">
                                        <p>Need help? Want to know Akshat?</p>
                                    </div>
                                )}
                                {showSecondMessage && (
                                    <div className="chatbot-message chatbot-message-second">
                                        <p>I'm here to assist you!</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <BotButton onClick={() => setChatbotOpen(true)}>
                            🐼
                        </BotButton>
                    </>
                )}

                {chatbotOpen && (
                    <div className="chatbot-container">
                        <div className="chatbox">
                            <div className="chatbox-header">
                                🐼 Akshat's Virtual Assistant
                                <button onClick={resetChat} className="refresh-chatbot-btn">🔄</button>
                                <button onClick={() => setChatbotOpen(false)} className="close-chatbot-btn">❌</button>
                            </div>
                            <div className="messages">
                                {messages.map((message, index) => (
                                    <div key={index} className={`message ${message.type}`}>
                                        {message.type === 'user' && (
                                            <button className="edit-button" onClick={() => editMessage(index)}>✏️</button>
                                        )}
                                        {message.text}
                                    </div>
                                ))}
                                {loading && <div className="message bot">{loadingMessages[currentLoadingIndex]}</div>}
                                <div ref={messagesEndRef}></div>
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Type a message..."
                                />
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Chatbot;
