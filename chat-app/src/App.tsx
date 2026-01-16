import React from 'react';
import { ChatProvider } from './ChatContext';
import SearchBar from './components/SearchBar';
import ConversationList from './components/ConversationList';
import MessageThread from './components/MessageThread';
import MessageInput from './components/MessageInput';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  return (
    <ChatProvider>
      <div className="App" style={{ display: 'flex', height: '100vh' }}>
        <SearchBar />
        <ConversationList />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <MessageThread />
          <MessageInput />
        </div>
        <ContactList />
      </div>
    </ChatProvider>
  );
}

export default App;
