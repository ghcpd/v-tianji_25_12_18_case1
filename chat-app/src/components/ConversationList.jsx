import React from 'react';
import { useChat } from '../context/ChatContext';
import '../styles/ConversationList.css';

export const ConversationList = () => {
  const { conversations, selectedConversation, setSelectedConversation } = useChat();

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  return (
    <div className="conversation-list">
      <div className="conversation-list-header">
        <h2>Conversations</h2>
      </div>
      <div className="conversation-items">
        {conversations.length === 0 ? (
          <div className="empty-state">No conversations yet</div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${selectedConversation === conv.id ? 'active' : ''}`}
              onClick={() => setSelectedConversation(conv.id)}
              data-testid={`conversation-${conv.id}`}
            >
              <div className="conversation-avatar">
                {conv.contactName.charAt(0).toUpperCase()}
              </div>
              <div className="conversation-content">
                <div className="conversation-header">
                  <h3>{conv.contactName}</h3>
                  <span className="timestamp">{formatTime(conv.lastMessageTime)}</span>
                </div>
                <p className="last-message">{conv.lastMessage || 'No messages yet'}</p>
                {conv.unreadCount > 0 && <span className="unread-badge">{conv.unreadCount}</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
