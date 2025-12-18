import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import '../styles/MessageThread.css';

export const MessageThread = () => {
  const { conversations, selectedConversation, sendMessage } = useChat();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const current = conversations.find((c) => c.id === selectedConversation);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [current?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (current && messageText.trim()) {
      sendMessage(current.id, messageText);
      setMessageText('');
    }
  };

  if (!current) {
    return (
      <div className="message-thread empty">
        <div className="no-selection">Select a conversation to start messaging</div>
      </div>
    );
  }

  return (
    <div className="message-thread">
      <div className="message-thread-header">
        <h2>{current.contactName}</h2>
        <div className="header-actions">
          <button className="header-btn" title="Call">☎️</button>
          <button className="header-btn" title="Video">📹</button>
          <button className="header-btn" title="Info">ℹ️</button>
        </div>
      </div>

      <div className="messages-container">
        {current.messages.length === 0 ? (
          <div className="empty-messages">No messages yet. Say hello!</div>
        ) : (
          current.messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}
              data-testid={`message-${msg.id}`}
            >
              <div className="message-bubble">
                <p>{msg.text}</p>
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          data-testid="message-input"
        />
        <button
          type="submit"
          className="send-btn"
          disabled={!messageText.trim()}
          data-testid="send-button"
        >
          Send
        </button>
      </form>
    </div>
  );
};
