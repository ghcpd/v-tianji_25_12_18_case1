import { create } from 'zustand';

export interface Message {
  id: string;
  sender: 'me' | 'other';
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
}

export interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  searchTerm: string;
  setActiveConversation: (id: string) => void;
  addMessage: (content: string, sender?: 'me' | 'other') => void;
  setSearchTerm: (term: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [
    {
      id: 'c1',
      name: 'Alice',
      messages: [
        { id: 'm1', sender: 'other', content: 'Hi!', timestamp: Date.now() - 60000 },
        { id: 'm2', sender: 'me', content: 'Hello!', timestamp: Date.now() - 50000 },
      ],
    },
    {
      id: 'c2',
      name: 'Bob',
      messages: [
        { id: 'm3', sender: 'other', content: 'Hey there', timestamp: Date.now() - 40000 },
        { id: 'm4', sender: 'me', content: 'What\'s up?', timestamp: Date.now() - 30000 },
      ],
    },
  ],
  activeConversationId: null,
  searchTerm: '',
  setActiveConversation: (id) => set({ activeConversationId: id }),
  addMessage: (content, sender = 'me') => {
    const state = get();
    if (!state.activeConversationId) return;
    const newMessage: Message = {
      id: Math.random().toString(36).substring(2),
      sender,
      content,
      timestamp: Date.now(),
    };
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === s.activeConversationId ? { ...c, messages: [...c.messages, newMessage] } : c
      ),
    }));
  },
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
