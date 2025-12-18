import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ChatProvider, useChat } from '../context/ChatContext';

// Test wrapper component
const ChatTestWrapper = ({ children }) => (
  <ChatProvider>{children}</ChatProvider>
);

// Test component to access context
const TestComponent = () => {
  const context = useChat();
  return (
    <div>
      <div data-testid="contacts-count">{context.contacts.length}</div>
      <div data-testid="conversations-count">{context.conversations.length}</div>
      <div data-testid="selected-conversation">{context.selectedConversation}</div>
      <div data-testid="search-query">{context.searchQuery}</div>
    </div>
  );
};

describe('ChatContext', () => {
  describe('Initial State', () => {
    it('should initialize with contacts', () => {
      render(<TestComponent />, { wrapper: ChatTestWrapper });
      expect(screen.getByTestId('contacts-count')).toHaveTextContent('5');
    });

    it('should initialize with conversations', () => {
      render(<TestComponent />, { wrapper: ChatTestWrapper });
      expect(screen.getByTestId('conversations-count')).toHaveTextContent('3');
    });

    it('should have a selected conversation', () => {
      render(<TestComponent />, { wrapper: ChatTestWrapper });
      expect(screen.getByTestId('selected-conversation')).toHaveTextContent('1');
    });

    it('should have empty search query', () => {
      render(<TestComponent />, { wrapper: ChatTestWrapper });
      expect(screen.getByTestId('search-query')).toHaveTextContent('');
    });
  });

  describe('Send Message', () => {
    it('should add message to conversation', () => {
      const { getByTestId } = render(<TestComponent />, { wrapper: ChatTestWrapper });
      
      // We need to access the hook directly via a component
      const MessageSender = () => {
        const { sendMessage, conversations } = useChat();
        return (
          <div>
            <button onClick={() => sendMessage(1, 'Hello')} data-testid="send-btn">
              Send
            </button>
            <div data-testid="message-count">
              {conversations[0]?.messages.length}
            </div>
          </div>
        );
      };

      const { rerender } = render(<MessageSender />, { wrapper: ChatTestWrapper });
      const sendBtn = screen.getByTestId('send-btn');
      const initialCount = screen.getByTestId('message-count').textContent;
      
      fireEvent.click(sendBtn);

      // Message should be added (including auto-reply)
      waitFor(() => {
        expect(screen.getByTestId('message-count').textContent).not.toBe(initialCount);
      });
    });

    it('should not send empty messages', () => {
      const MessageSender = () => {
        const { sendMessage, conversations } = useChat();
        const initialCount = conversations[0]?.messages.length;
        
        return (
          <div>
            <button onClick={() => sendMessage(1, '   ')} data-testid="send-empty">
              Send Empty
            </button>
            <div data-testid="message-count">{conversations[0]?.messages.length}</div>
            <div data-testid="initial-count">{initialCount}</div>
          </div>
        );
      };

      render(<MessageSender />, { wrapper: ChatTestWrapper });
      const sendBtn = screen.getByTestId('send-empty');
      const initialCount = parseInt(screen.getByTestId('initial-count').textContent);
      
      fireEvent.click(sendBtn);

      expect(parseInt(screen.getByTestId('message-count').textContent)).toBe(initialCount);
    });
  });

  describe('Search Messages', () => {
    it('should find messages by keyword', () => {
      const SearchTester = () => {
        const { searchMessages } = useChat();
        const results = searchMessages('How are you');
        return <div data-testid="search-results">{results.length}</div>;
      };

      render(<SearchTester />, { wrapper: ChatTestWrapper });
      expect(screen.getByTestId('search-results')).toHaveTextContent('1');
    });

    it('should return empty array for no matches', () => {
      const SearchTester = () => {
        const { searchMessages } = useChat();
        const results = searchMessages('xyzabc');
        return <div data-testid="search-results">{results.length}</div>;
      };

      render(<SearchTester />, { wrapper: ChatTestWrapper });
      expect(screen.getByTestId('search-results')).toHaveTextContent('0');
    });

    it('should be case insensitive', () => {
      const SearchTester = () => {
        const { searchMessages } = useChat();
        const results = searchMessages('HOW ARE YOU');
        return <div data-testid="search-results">{results.length}</div>;
      };

      render(<SearchTester />, { wrapper: ChatTestWrapper });
      expect(screen.getByTestId('search-results')).toHaveTextContent('1');
    });

    it('should update search query', () => {
      const SearchUpdater = () => {
        const { searchQuery, setSearchQuery } = useChat();
        return (
          <div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="search-input"
            />
            <div data-testid="current-query">{searchQuery}</div>
          </div>
        );
      };

      render(<SearchUpdater />, { wrapper: ChatTestWrapper });
      const input = screen.getByTestId('search-input');
      
      fireEvent.change(input, { target: { value: 'test' } });
      expect(screen.getByTestId('current-query')).toHaveTextContent('test');
    });
  });

  describe('Contact Management', () => {
    it('should add new contact', () => {
      const ContactAdder = () => {
        const { addContact, contacts } = useChat();
        return (
          <div>
            <button onClick={() => addContact('New Contact')} data-testid="add-btn">
              Add
            </button>
            <div data-testid="contact-count">{contacts.length}</div>
          </div>
        );
      };

      const { rerender } = render(<ContactAdder />, { wrapper: ChatTestWrapper });
      const addBtn = screen.getByTestId('add-btn');
      const initialCount = parseInt(screen.getByTestId('contact-count').textContent);
      
      fireEvent.click(addBtn);

      waitFor(() => {
        expect(parseInt(screen.getByTestId('contact-count').textContent)).toBe(initialCount + 1);
      });
    });

    it('should delete contact', () => {
      const ContactDeleter = () => {
        const { deleteContact, contacts } = useChat();
        return (
          <div>
            <button onClick={() => deleteContact(1)} data-testid="delete-btn">
              Delete
            </button>
            <div data-testid="contact-count">{contacts.length}</div>
          </div>
        );
      };

      const { rerender } = render(<ContactDeleter />, { wrapper: ChatTestWrapper });
      const deleteBtn = screen.getByTestId('delete-btn');
      const initialCount = parseInt(screen.getByTestId('contact-count').textContent);
      
      fireEvent.click(deleteBtn);

      waitFor(() => {
        expect(parseInt(screen.getByTestId('contact-count').textContent)).toBe(initialCount - 1);
      });
    });

    it('should create new conversation with contact', () => {
      const ConversationCreator = () => {
        const { createNewConversation, selectedConversation } = useChat();
        return (
          <div>
            <button onClick={() => createNewConversation(1)} data-testid="create-conv-btn">
              Create
            </button>
            <div data-testid="selected-conv">{selectedConversation}</div>
          </div>
        );
      };

      render(<ConversationCreator />, { wrapper: ChatTestWrapper });
      const createBtn = screen.getByTestId('create-conv-btn');
      
      fireEvent.click(createBtn);

      expect(screen.getByTestId('selected-conv')).toHaveTextContent('1');
    });

    it('should not add contact with empty name', () => {
      const ContactAdder = () => {
        const { addContact, contacts } = useChat();
        const initialCount = contacts.length;
        
        return (
          <div>
            <button onClick={() => addContact('')} data-testid="add-empty">
              Add Empty
            </button>
            <div data-testid="contact-count">{contacts.length}</div>
            <div data-testid="initial-count">{initialCount}</div>
          </div>
        );
      };

      render(<ContactAdder />, { wrapper: ChatTestWrapper });
      const addBtn = screen.getByTestId('add-empty');
      const initialCount = parseInt(screen.getByTestId('initial-count').textContent);
      
      fireEvent.click(addBtn);

      expect(parseInt(screen.getByTestId('contact-count').textContent)).toBe(initialCount);
    });
  });

  describe('Conversation Selection', () => {
    it('should update selected conversation', () => {
      const ConversationSelector = () => {
        const { setSelectedConversation, selectedConversation } = useChat();
        return (
          <div>
            <button onClick={() => setSelectedConversation(2)} data-testid="select-2">
              Select 2
            </button>
            <div data-testid="selected">{selectedConversation}</div>
          </div>
        );
      };

      render(<ConversationSelector />, { wrapper: ChatTestWrapper });
      const selectBtn = screen.getByTestId('select-2');
      
      fireEvent.click(selectBtn);
      expect(screen.getByTestId('selected')).toHaveTextContent('2');
    });
  });

  describe('Error Handling', () => {
    it('should throw error when using hook outside provider', () => {
      const ComponentWithoutProvider = () => {
        const context = useChat();
        return <div>{context}</div>;
      };

      expect(() => {
        render(<ComponentWithoutProvider />);
      }).toThrow('useChat must be used within ChatProvider');
    });
  });
});
