import React from 'react';
import { useChat } from '../context/ChatContext';
import '../styles/SearchBar.css';

export const SearchBar = ({ onResultsChange }) => {
  const { searchQuery, setSearchQuery, searchMessages } = useChat();

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = searchMessages(query);
    onResultsChange(results);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search messages..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
        data-testid="search-input"
      />
      {searchQuery && (
        <button
          className="clear-btn"
          onClick={() => handleSearch('')}
          data-testid="clear-search"
        >
          ✕
        </button>
      )}
    </div>
  );
};
