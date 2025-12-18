import React, { createContext, useState, useContext, useCallback } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alice Johnson', avatar: '👩‍💼', status: 'online' },
    { id: 2, name: 'Bob Smith', avatar: '👨‍💻', status: 'online' },
    { id: 3, name: 'Carol Davis', avatar: '👩‍🔬', status: 'away' },
    { id: 4, name: 'David Wilson', avatar: '👨‍🎨', status: 'offline' },
    { id: 5, name: 'Eve Martinez', avatar: '👩‍⚕️', status: 'online' },
  ]);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      contactId: 1,
      contactName: 'Alice Johnson',
      lastMessage: 'See you tomorrow!',
      lastMessageTime: new Date(Date.now() - 5 * 60000),
      unreadCount: 0,
      messages: [
        { id: 1, text: 'Hi! How are you?', sender: 'contact', timestamp: new Date(Date.now() - 30 * 60000) },
        { id: 2, text: 'I am doing great! Just finished a project', sender: 'user', timestamp: new Date(Date.now() - 25 * 60000) },
        { id: 3, text: 'That sounds amazing! Tell me more', sender: 'contact', timestamp: new Date(Date.now() - 20 * 60000) },
        { id: 4, text: 'It was a challenging web app project', sender: 'user', timestamp: new Date(Date.now() - 15 * 60000) },
        { id: 5, text: 'Awesome! See you tomorrow!', sender: 'contact', timestamp: new Date(Date.now() - 5 * 60000) },
        { id: 6, text: 'See you tomorrow!', sender: 'user', timestamp: new Date(Date.now() - 2 * 60000) },
      ],
    },
    {
      id: 2,
      contactId: 2,
      contactName: 'Bob Smith',
      lastMessage: 'Let me check that',
      lastMessageTime: new Date(Date.now() - 2 * 3600000),
      unreadCount: 2,
      messages: [
        { id: 1, text: 'Did you get my email?', sender: 'contact', timestamp: new Date(Date.now() - 3 * 3600000) },
        { id: 2, text: 'Yes, I saw it', sender: 'user', timestamp: new Date(Date.now() - 2.5 * 3600000) },
        { id: 3, text: 'Let me check that', sender: 'contact', timestamp: new Date(Date.now() - 2 * 3600000) },
      ],
    },
    {
      id: 3,
      contactId: 3,
      contactName: 'Carol Davis',
      lastMessage: 'Thanks for your help',
      lastMessageTime: new Date(Date.now() - 1 * 3600000),
      unreadCount: 0,
      messages: [
        { id: 1, text: 'Can you help me with this?', sender: 'contact', timestamp: new Date(Date.now() - 2 * 3600000) },
        { id: 2, text: 'Of course! What do you need?', sender: 'user', timestamp: new Date(Date.now() - 1.8 * 3600000) },
        { id: 3, text: 'Thanks for your help', sender: 'contact', timestamp: new Date(Date.now() - 1 * 3600000) },
      ],
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const sendMessage = useCallback((conversationId, text) => {
    if (!text.trim()) return;

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          const newMessage = {
            id: (conv.messages[conv.messages.length - 1]?.id || 0) + 1,
            text: text.trim(),
            sender: 'user',
            timestamp: new Date(),
          };

          // Simulate response
          const responseMessage = {
            id: newMessage.id + 1,
            text: generateAutoReply(text),
            sender: 'contact',
            timestamp: new Date(Date.now() + 1000),
          };

          return {
            ...conv,
            messages: [...conv.messages, newMessage, responseMessage],
            lastMessage: text.trim(),
            lastMessageTime: new Date(),
            unreadCount: 0,
          };
        }
        return conv;
      })
    );
  }, []);

  const generateAutoReply = (message) => {
    const replies = [
      'That sounds great!',
      'I agree with you.',
      'Thanks for letting me know!',
      'Absolutely!',
      'Good point!',
      'I\'ll look into that.',
      'Sounds like a plan!',
      'Let me think about that.',
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const searchMessages = useCallback((query) => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    const results = [];

    conversations.forEach((conv) => {
      conv.messages.forEach((msg) => {
        if (msg.text.toLowerCase().includes(lowerQuery)) {
          results.push({
            conversationId: conv.id,
            contactName: conv.contactName,
            message: msg.text,
            timestamp: msg.timestamp,
          });
        }
      });
    });

    return results;
  }, [conversations]);

  const addContact = useCallback((name) => {
    if (!name.trim()) return;
    const newContact = {
      id: Math.max(...contacts.map((c) => c.id), 0) + 1,
      name: name.trim(),
      avatar: '👤',
      status: 'offline',
    };
    setContacts((prev) => [...prev, newContact]);
    return newContact;
  }, [contacts]);

  const deleteContact = useCallback((contactId) => {
    setContacts((prev) => prev.filter((c) => c.id !== contactId));
    setConversations((prev) => prev.filter((conv) => conv.contactId !== contactId));
  }, []);

  const createNewConversation = useCallback((contactId) => {
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) return;

    const existing = conversations.find((c) => c.contactId === contactId);
    if (existing) {
      setSelectedConversation(existing.id);
      return;
    }

    const newConv = {
      id: Math.max(...conversations.map((c) => c.id), 0) + 1,
      contactId,
      contactName: contact.name,
      lastMessage: '',
      lastMessageTime: new Date(),
      unreadCount: 0,
      messages: [],
    };
    setConversations((prev) => [...prev, newConv]);
    setSelectedConversation(newConv.id);
  }, [contacts, conversations]);

  return (
    <ChatContext.Provider
      value={{
        contacts,
        conversations,
        selectedConversation,
        setSelectedConversation,
        searchQuery,
        setSearchQuery,
        sendMessage,
        searchMessages,
        addContact,
        deleteContact,
        createNewConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
