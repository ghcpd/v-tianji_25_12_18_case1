import create from 'zustand'
import { initialContacts, initialConversations, Conversation, Contact, Message } from '../data/mock'

export type ChatState = {
  contacts: Contact[]
  conversations: Conversation[]
  currentConversationId?: string
  setCurrentConversation: (id: string) => void
  sendMessage: (text: string) => void
  addContact: (name: string) => Contact
  searchConversations: (query: string) => Conversation[]
}

export const useChatStore = create<ChatState>((set, get) => ({
  contacts: initialContacts,
  conversations: initialConversations,
  currentConversationId: initialConversations[0].id,
  setCurrentConversation: (id: string) => set({ currentConversationId: id }),
  sendMessage: (text: string) => {
    const id = `m${Math.random().toString(36).slice(2, 9)}`
    const ts = Date.now()
    const convId = get().currentConversationId!
    set({
      conversations: get().conversations.map((c) =>
        c.id === convId
          ? { ...c, messages: [...c.messages, { id, text, sender: 'me', ts }] }
          : c
      )
    })
  },
  addContact: (name: string) => {
    const newContact = { id: `c${Math.random().toString(36).slice(2, 9)}`, name }
    set({ contacts: [...get().contacts, newContact] })
    return newContact
  },
  searchConversations: (query: string) => {
    const q = query.trim().toLowerCase()
    if (!q) return get().conversations
    return get()
      .conversations.filter((c) => c.title.toLowerCase().includes(q) || c.messages.some((m) => m.text.toLowerCase().includes(q)))
  }
}))
