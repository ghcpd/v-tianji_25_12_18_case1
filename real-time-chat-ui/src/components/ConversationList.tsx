import React from 'react'
import { useChatStore } from '../store/chatStore'
import Avatar from './Avatar'

export default function ConversationList({ query }: { query: string }) {
  const conversations = useChatStore((s) => s.searchConversations(query))
  const current = useChatStore((s) => s.currentConversationId)
  const setCurrent = useChatStore((s) => s.setCurrentConversation)

  return (
    <div className="h-full overflow-auto">
      {conversations.map((c) => (
        <button
          key={c.id}
          className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-100 ${
            c.id === current ? 'bg-slate-100' : ''
          }`}
          onClick={() => setCurrent(c.id)}
        >
          <Avatar name={c.title} />
          <div>
            <div className="font-medium">{c.title}</div>
            <div className="text-sm text-slate-500 truncate max-w-[220px]">
              {c.messages[c.messages.length - 1]?.text}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
