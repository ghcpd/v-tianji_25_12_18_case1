import React from 'react';
import { ChatProvider } from './context/ChatContext';
import { ChatApp } from './components/ChatApp';
import './styles/variables.css';
import './index.css';

function App() {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
}

export default App;
