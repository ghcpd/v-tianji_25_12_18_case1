import { render, screen, fireEvent } from '@testing-library/react';
import ConversationList from './ConversationList';
import { useChatStore } from '../store/chatStore';
import { describe, test, expect, beforeEach } from 'vitest';

describe('ConversationList', () => {
  beforeEach(() => {
    // reset store to known state
    useChatStore.setState({
      conversations: [
        {
          id: 'c1',
          name: 'Alice',
          messages: [
            { id: 'm1', sender: 'other', content: 'Hi Alice', timestamp: 1000 },
          ],
        },
        {
          id: 'c2',
          name: 'Bob',
          messages: [
            { id: 'm2', sender: 'other', content: 'Hi Bob', timestamp: 2000 },
          ],
        },
      ],
      activeConversationId: null,
      searchTerm: '',
      setActiveConversation: (id) =>
        useChatStore.setState({ activeConversationId: id }),
      addMessage: () => {},
      setSearchTerm: (term) => useChatStore.setState({ searchTerm: term }),
    });
  });

  test('renders conversation list and allows selecting', () => {
    render(<ConversationList />);

    const alice = screen.getByText('Alice');
    const bob = screen.getByText('Bob');
    expect(alice).toBeTruthy();
    expect(bob).toBeTruthy();

    fireEvent.click(bob);
    expect(useChatStore.getState().activeConversationId).toBe('c2');
  });

  test('filters by search term', () => {
    useChatStore.getState().setSearchTerm('bo');
    render(<ConversationList />);

    expect(screen.queryByText('Alice')).toBeNull();
    expect(screen.getAllByText('Bob').length).toBeGreaterThan(0);
  });
});
