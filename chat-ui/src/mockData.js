export const initialContacts = [
  { id: 'c1', name: 'Ava Martin', handle: '@ava', color: '#ffd6a5' },
  { id: 'c2', name: 'Liam Johnson', handle: '@liam', color: '#c7f9cc' },
  { id: 'c3', name: 'Sophia Lee', handle: '@sophia', color: '#bde0fe' }
]

export const initialConversations = [
  {
    id: 't1',
    title: 'Design sync',
    participants: ['Ava Martin','You'],
    unread: 2,
    messages: [
      { id: 'm1', from: 'Ava Martin', text: 'Hey — did you see the new layout updates?', ts: 1696000000000 },
      { id: 'm2', from: 'You', text: 'Yes, they look great! I adjusted spacing on mobile.', ts: 1696000600000 }
    ]
  },
  {
    id: 't2',
    title: 'Coffee buddies ☕',
    participants: ['Liam Johnson','You'],
    unread: 0,
    messages: [
      { id: 'm3', from: 'Liam Johnson', text: "Let's grab coffee tomorrow.", ts: 1695900000000 }
    ]
  },
  {
    id: 't3',
    title: 'General',
    participants: ['Sophia Lee','You'],
    unread: 5,
    messages: [
      { id: 'm4', from: 'Sophia Lee', text: 'Welcome to the team! 🎉', ts: 1695800000000 }
    ]
  }
]
