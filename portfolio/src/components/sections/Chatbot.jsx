import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import styled from "styled-components";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! Ask me anything about Akshat." },
    {
      type: "bot",
      text: "Ask me about Akshat, his qualification, and much more!",
    },
    {
      type: "bot",
      text: "Please share your valuable feedback at the end of the conversation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const [showMessages, setShowMessages] = useState({
    first: false,
    second: false,
  });

  const placeholderQuestions = [
    "Hi",
    "Hello",
    "Jai Shree Ram",
    "Tell me about Akshat",
    "What are Akshat’s hobbies?",
    "What technologies does Akshat know?",
    "What projects has Akshat worked on?",
    "How can I contact Akshat?",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    resetMessagesEffect();
  }, []);

  const resetMessagesEffect = () => {
    setShowMessages({ first: false, second: false });

    const firstMessageTimer = setTimeout(() => {
      setShowMessages((prev) => ({ ...prev, first: true }));
    }, 1000);
    const secondMessageTimer = setTimeout(() => {
      setShowMessages((prev) => ({ ...prev, second: true }));
    }, 3000);

    return () => {
      clearTimeout(firstMessageTimer);
      clearTimeout(secondMessageTimer);
    };
  };

  useEffect(() => {
    const placeholderInterval = setInterval(() => {
      setPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % placeholderQuestions.length
      );
    }, 3000);

    return () => clearInterval(placeholderInterval);
  }, []);

  const handleInputChange = (e) => setInput(e.target.value);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages];
    if (editing) {
      newMessages[editIndex].text = input;
      newMessages.splice(editIndex + 1, 1);
      setEditing(false);
      setEditIndex(null);
    } else {
      newMessages.push({ type: "user", text: input });
    }

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://akf-7.onrender.com/send-msg", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ MSG: input }),
      });

      const data = await response.json();
      setLoading(false);

      const botResponse = data.Reply || "Sorry, I didn't understand that.";
      typeWriterEffect(botResponse);
    } catch (error) {
      setLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          text: "Error: Unable to connect to the server. Please refresh or try again later.",
        },
      ]);
    }
  };

  const typeWriterEffect = (text) => {
    let index = 0;
    const newBotMessage = { type: "bot", text: "", partial: true };

    setMessages((prevMessages) => [...prevMessages, newBotMessage]);

    const interval = setInterval(() => {
      index++;
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessageIndex = updatedMessages.length - 1;

        if (
          lastMessageIndex >= 0 &&
          updatedMessages[lastMessageIndex].partial
        ) {
          updatedMessages[lastMessageIndex].text = text.slice(0, index);
        }

        return updatedMessages;
      });

      if (index === text.length) {
        clearInterval(interval);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessageIndex = updatedMessages.length - 1;

          if (
            lastMessageIndex >= 0 &&
            updatedMessages[lastMessageIndex].partial
          ) {
            updatedMessages[lastMessageIndex].partial = false;
          }

          return updatedMessages;
        });
      }
    }, 50);
  };

  const editMessage = (index) => {
    setEditing(true);
    setEditIndex(index);
    setInput(messages[index].text);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetChat = () => {
    setMessages([{ type: "bot", text: "Hi! Ask me anything about Akshat." }]);
  };

  const dismissMessage = (key) => {
    setShowMessages((prev) => ({ ...prev, [key]: false }));
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

//   const CloseButton = styled.button`
//     position: absolute;
//     top: 0;
//     right: 0;
//     background: transparent;
//     border: none;
//     font-size: 12px;
//     cursor: pointer;
//     padding: 2px;
//     margin: 2px;
//     z-index: 1;
//   `;|

const CloseButton = styled.button`
  position: absolute;
  top: -10px; 
  right: -10px; 
  background: white;
  border: 2px solid #ccc;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  padding: 5px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); 
  z-index: 1;
  &:hover {
    background: #f0f0f0; 
  }
`;

  return (
    <>
      <div className="chatbot-wrapper">
        {!chatbotOpen && (
          <>
            <div className="chatbot-messages">
              {showMessages.first && (
                <div className="chatbot-message chatbot-message-first">
                  <CloseButton
                    className="close-btn"
                    onClick={() => dismissMessage("first")}
                  >
                    ❌
                  </CloseButton>
                  <p>Need help? Want to know Akshat?</p>
                </div>
              )}
              {showMessages.second && (
                <div className="chatbot-message chatbot-message-second">
                  <CloseButton
                    className="close-btn"
                    onClick={() => dismissMessage("second")}
                  >
                    ❌
                  </CloseButton>
                  <p>I'm here to assist you!</p>
                </div>
              )}
            </div>
            <BotButton onClick={() => setChatbotOpen(true)}>🐼</BotButton>
          </>
        )}

        {chatbotOpen && (
          <div className="chatbot-container">
            <div className="chatbox">
              <div className="chatbox-header">
                🐼Akshat's Virtual Assistant
                <button
                  title="Reset Chat"
                  onClick={resetChat}
                  className="refresh-chatbot-btn"
                >
                  🔄
                </button>
                <button
                  title="Close Chat"
                  onClick={() => setChatbotOpen(false)}
                  className="close-chatbot-btn"
                >
                  ❌
                </button>
              </div>
              <div className="messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.type}`}>
                    {message.type === "user" && (
                      <button
                        className="edit-button"
                        onClick={() => editMessage(index)}
                      >
                        ✏️
                      </button>
                    )}
                    {message.text}
                  </div>
                ))}
                {loading && (
                  <div className="message bot">
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef}></div>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={placeholderQuestions[placeholderIndex]}
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
