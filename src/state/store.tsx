import React, { createContext, useReducer, useContext, useEffect } from 'react'
import { Conversation, Message, Contact } from '../types'
import { realtime } from '../lib/mockRealtime'

type State = {
  conversations: Conversation[]
  contacts: Contact[]
  activeConversationId?: string
}

const initialState: State = {
  conversations: [
    {
      id: 'conv-1',
      title: 'Project Team',
      participants: ['Alice', 'You'],
      unread: 1,
      messages: [
        { id: 'm1', from: 'Alice', text: 'Welcome to the project!', timestamp: Date.now() - 1000 * 60 * 60 },
      ],
    },
    {
      id: 'conv-2',
      title: 'Bob',
      participants: ['Bob', 'You'],
      unread: 0,
      messages: [
        { id: 'm2', from: 'Bob', text: "Let's catch up later.", timestamp: Date.now() - 1000 * 60 * 40 },
      ],
    },
  ],
  contacts: [
    { id: 'c1', name: 'Alice', presence: 'online' },
    { id: 'c2', name: 'Bob', presence: 'offline' },
  ],
  activeConversationId: 'conv-1',
}

type Action =
  | { type: 'select-conversation'; id: string }
  | { type: 'send-message'; convId: string; text: string }
  | { type: 'receive-message'; convId: string; message: Message }
  | { type: 'add-contact'; contact: Contact }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'select-conversation':
      return { ...state, activeConversationId: action.id, conversations: state.conversations.map(c => c.id === action.id ? {...c, unread: 0} : c) }
    case 'send-message':
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === action.convId
            ? { ...c, messages: [...c.messages, { id: Math.random().toString(36).slice(2,9), from: 'You', text: action.text, timestamp: Date.now() }] }
            : c
        ),
      }
    case 'receive-message':
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === action.convId
            ? { ...c, messages: [...c.messages, action.message], unread: (c.unread||0) + 1 }
            : c
        ),
      }
    case 'add-contact':
      return { ...state, contacts: [action.contact, ...state.contacts] }
    default:
      return state
  }
}

const StoreContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    realtime.start()
    const off = realtime.onMessage((convId, msg) => {
      dispatch({ type: 'receive-message', convId, message: msg })
    })
    return () => {
      off()
      realtime.stop()
    }
  }, [])

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
