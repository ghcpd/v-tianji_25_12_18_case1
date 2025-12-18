import React, { useState } from 'react';
import { useChat } from '../ChatContext';

const MessageInput: React.FC = () => {
  const { sendMessage, selectedConversation } = useChat();
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text);
      setText('');
    }
  };

  if (!selectedConversation) return null;

  return (
    <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type a message..."
        style={{ width: '80%', padding: '8px' }}
      />
      <button onClick={handleSend} style={{ padding: '8px' }}>Send</button>
    </div>
  );
};

export default MessageInput;