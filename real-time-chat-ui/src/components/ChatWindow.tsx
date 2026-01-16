import React from 'react'
import { useChatStore } from '../store/chatStore'
import MessageInput from './MessageInput'

function MessageRow({ m }: { m: { id: string; text: string; sender: string; ts: number } }) {
  const isMe = m.sender === 'me'
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`${isMe ? 'bg-indigo-600 text-white' : 'bg-white border'} px-4 py-2 rounded-md max-w-[70%]`}>{m.text}</div>
    </div>
  )
}

export default function ChatWindow() {
  const current = useChatStore((s) => s.currentConversationId)
  const conv = useChatStore((s) => s.conversations.find((c) => c.id === current))

  if (!conv) return <div className="p-6">No conversation selected</div>

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-3">
        <div className="font-semibold text-lg">{conv.title}</div>
        <div className="text-sm text-slate-500">{conv.participants.join(', ')}</div>
      </div>
      <div className="p-4 overflow-auto flex-1 bg-slate-50">
        {conv.messages.map((m) => (
          <MessageRow key={m.id} m={m} />
        ))}
      </div>
      <MessageInput />
    </div>
  )
}
