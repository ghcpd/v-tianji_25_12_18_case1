export type Message = {
  id: string
  text: string
  sender: 'me' | 'them'
  ts: number
}

export type Conversation = {
  id: string
  title: string
  participants: string[]
  messages: Message[]
}

export type Contact = {
  id: string
  name: string
}

export const initialContacts: Contact[] = [
  { id: 'c1', name: 'Alice' },
  { id: 'c2', name: 'Bob' },
  { id: 'c3', name: 'Carol' }
]

export const initialConversations: Conversation[] = [
  {
    id: 'conv1',
    title: 'Alice',
    participants: ['Alice'],
    messages: [
      { id: 'm1', text: 'Hey! How are you?', sender: 'them', ts: Date.now() - 1000 * 60 * 60 },
      { id: 'm2', text: "I'm doing well, thanks!", sender: 'me', ts: Date.now() - 1000 * 60 * 58 }
    ]
  },
  {
    id: 'conv2',
    title: 'Bob',
    participants: ['Bob'],
    messages: [
      { id: 'm3', text: 'Are we still on for tomorrow?', sender: 'them', ts: Date.now() - 1000 * 60 * 60 * 24 },
      { id: 'm4', text: 'Yes, see you then!', sender: 'me', ts: Date.now() - 1000 * 60 * 60 * 23 }
    ]
  }
]
