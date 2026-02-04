import { render, screen, fireEvent } from '@testing-library/react';
import MessageInput from './MessageInput';
import { useChatStore } from '../store/chatStore';
import { describe, test, expect, beforeEach, vi } from 'vitest';

describe('MessageInput', () => {
  beforeEach(() => {
    useChatStore.setState({
      conversations: [
        { id: 'c1', name: 'Alice', messages: [] },
      ],
      activeConversationId: 'c1',
      searchTerm: '',
      setActiveConversation: () => {},
      addMessage: () => {},
      setSearchTerm: () => {},
    });
  });

  test('sends message on Enter key', async () => {
    const addMessageMock = vi.fn();
    useChatStore.setState({ addMessage: addMessageMock });

    render(<MessageInput />);
    const textarea = screen.getByPlaceholderText('Type a message...');

    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });

    expect(addMessageMock).toHaveBeenCalledWith('Hello');
  });
});
