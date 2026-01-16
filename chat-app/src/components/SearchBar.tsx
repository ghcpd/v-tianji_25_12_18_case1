import React from 'react';
import { useChat } from '../ChatContext';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useChat();

  return (
    <input
      type="text"
      placeholder="Search chat history..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
    />
  );
};

export default SearchBar;