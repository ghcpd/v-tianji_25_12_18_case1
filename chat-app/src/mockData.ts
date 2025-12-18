import { Contact, Conversation, Message } from './types';

export const mockContacts: Contact[] = [
  { id: '1', name: 'Alice', avatar: 'A' },
  { id: '2', name: 'Bob', avatar: 'B' },
  { id: '3', name: 'Charlie', avatar: 'C' },
  { id: '4', name: 'Diana', avatar: 'D' },
];

export const mockMessages: Message[] = [
  { id: '1', senderId: '1', text: 'Hello!', timestamp: new Date('2025-12-18T10:00:00') },
  { id: '2', senderId: '2', text: 'Hi there!', timestamp: new Date('2025-12-18T10:01:00') },
  { id: '3', senderId: '1', text: 'How are you?', timestamp: new Date('2025-12-18T10:02:00') },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockContacts[0], mockContacts[1]],
    messages: mockMessages,
    lastMessage: mockMessages[2],
  },
  {
    id: '2',
    participants: [mockContacts[0], mockContacts[2]],
    messages: [],
  },
];