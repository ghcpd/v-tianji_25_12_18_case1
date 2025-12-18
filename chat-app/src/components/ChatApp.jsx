import React, { useState } from 'react';
import { ConversationList } from './ConversationList';
import { MessageThread } from './MessageThread';
import { ContactManager } from './ContactManager';
import { SearchBar } from './SearchBar';
import '../styles/ChatApp.css';

export const ChatApp = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (results) => {
    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  return (
    <div className="chat-app">
      <header className="app-header">
        <h1>💬 Chat App</h1>
        <button
          className="contacts-btn"
          onClick={() => setContactModalOpen(true)}
          data-testid="contacts-btn"
        >
          👥 Contacts
        </button>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <SearchBar onResultsChange={handleSearch} />

          {showSearchResults && searchResults.length > 0 ? (
            <div className="search-results">
              <h3>Search Results ({searchResults.length})</h3>
              {searchResults.map((result, idx) => (
                <div key={idx} className="search-result-item" data-testid={`search-result-${idx}`}>
                  <p className="result-contact">{result.contactName}</p>
                  <p className="result-message">"{result.message}"</p>
                  <p className="result-time">
                    {result.timestamp.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <ConversationList />
          )}
        </aside>

        <main className="main-content">
          <MessageThread />
        </main>
      </div>

      <ContactManager
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
};
