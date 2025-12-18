import React from 'react';
import { useChat } from '../ChatContext';
import { Conversation } from '../types';

const ConversationList: React.FC = () => {
  const { conversations, selectedConversation, setSelectedConversation, searchQuery } = useChat();

  const filteredConversations = conversations.filter(conv =>
    conv.messages.some(msg => msg.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
    conv.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
      <h3>Conversations</h3>
      {filteredConversations.map((conv: Conversation) => (
        <div
          key={conv.id}
          onClick={() => setSelectedConversation(conv)}
          style={{
            padding: '10px',
            cursor: 'pointer',
            background: selectedConversation?.id === conv.id ? '#e0e0e0' : 'white',
            borderBottom: '1px solid #eee'
          }}
        >
          {conv.participants.map(p => p.name).join(', ')}
          {conv.lastMessage && <p>{conv.lastMessage.text}</p>}
        </div>
      ))}
    </div>
  );
};

export default ConversationList;