import React from 'react';
import { useChatStore } from '../store/chatStore';

export default function ConversationList() {
  const { conversations, activeConversationId, setActiveConversation, searchTerm } = useChatStore();
  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="conversation-list">
      {filtered.map((c) => (
        <div
          key={c.id}
          className={`conversation-item ${c.id === activeConversationId ? 'active' : ''}`}
          onClick={() => setActiveConversation(c.id)}
        >
          <div className="conversation-name">{c.name}</div>
          <div className="conversation-last">
            {c.messages[c.messages.length - 1]?.content.slice(0, 20)}
          </div>
        </div>
      ))}
    </div>
  );
}
