import { render, screen } from '@testing-library/react';
import ChatView from './ChatView';
import { useChatStore } from '../store/chatStore';
import { describe, test, expect, beforeEach } from 'vitest';

describe('ChatView', () => {
  beforeEach(() => {
    useChatStore.setState({
      conversations: [
        { id: 'c1', name: 'Alice', messages: [] },
      ],
      activeConversationId: null,
      searchTerm: '',
      setActiveConversation: () => {},
      addMessage: () => {},
      setSearchTerm: () => {},
    });
  });

  test('shows placeholder when no conversation selected', () => {
    render(<ChatView />);
    expect(
      screen.getByText('Select a conversation to start chatting.')
    ).toBeTruthy();
  });

  test('renders messages when conversation selected', () => {
    useChatStore.setState({
      activeConversationId: 'c1',
      conversations: [
        {
          id: 'c1',
          name: 'Alice',
          messages: [
            { id: 'm1', sender: 'me', content: 'Hi', timestamp: 100 },
          ],
        },
      ],
    });
    render(<ChatView />);
    expect(screen.getAllByText('Hi').length).toBeGreaterThan(0);
  });
});