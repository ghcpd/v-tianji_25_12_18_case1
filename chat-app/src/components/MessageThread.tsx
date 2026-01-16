import React from 'react';
import { useChat } from '../ChatContext';
import { Message } from '../types';

const MessageThread: React.FC = () => {
  const { selectedConversation } = useChat();

  if (!selectedConversation) {
    return <div style={{ flex: 1, padding: '10px' }}>Select a conversation</div>;
  }

  return (
    <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
      {selectedConversation.messages.map((msg: Message) => (
        <div key={msg.id} style={{ marginBottom: '10px' }}>
          <strong>{msg.senderId === 'me' ? 'You' : msg.senderId}:</strong> {msg.text}
          <small> {msg.timestamp.toLocaleTimeString()}</small>
        </div>
      ))}
    </div>
  );
};

export default MessageThread;