import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Contact, Conversation, Message } from './types';
import { mockContacts, mockConversations } from './mockData';

interface ChatContextType {
  contacts: Contact[];
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  searchQuery: string;
  setSelectedConversation: (conv: Conversation | null) => void;
  sendMessage: (text: string) => void;
  setSearchQuery: (query: string) => void;
  addContact: (contact: Contact) => void;
  removeContact: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sendMessage = (text: string) => {
    if (!selectedConversation) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me', // assuming user is 'me'
      text,
      timestamp: new Date(),
    };
    const updatedConv = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: newMessage,
    };
    setConversations(convs => convs.map(c => c.id === selectedConversation.id ? updatedConv : c));
    setSelectedConversation(updatedConv);
  };

  const addContact = (contact: Contact) => {
    setContacts(prev => [...prev, contact]);
  };

  const removeContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <ChatContext.Provider value={{
      contacts,
      conversations,
      selectedConversation,
      searchQuery,
      setSelectedConversation,
      sendMessage,
      setSearchQuery,
      addContact,
      removeContact,
    }}>
      {children}
    </ChatContext.Provider>
  );
};