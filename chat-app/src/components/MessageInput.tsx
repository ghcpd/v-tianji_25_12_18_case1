import React, { useState } from 'react';
import { useChatStore } from '../store/chatStore';

export default function MessageInput() {
  const [text, setText] = useState('');
  const addMessage = useChatStore((s) => s.addMessage);

  const handleSend = () => {
    if (text.trim() === '') return;
    addMessage(text.trim());
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        rows={1}
        style={{ resize: 'none', flex: 1 }}
      />
      <button onClick={handleSend} disabled={text.trim() === ''}>Send</button>
    </div>
  );
}
