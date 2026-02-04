import React from 'react';
import { useChatStore } from '../store/chatStore';

export default function ChatView() {
  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const conversation = useChatStore((s) =>
    s.conversations.find((c) => c.id === activeConversationId)
  );

  if (!conversation) {
    return (
      <div className="chat-view empty">
        <p>Select a conversation to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="chat-view">
      {conversation.messages.map((m) => (
        <div key={m.id} className={`message ${m.sender}`}>
          <div className="content">{m.content}</div>
          <div className="timestamp">{new Date(m.timestamp).toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  );
}
