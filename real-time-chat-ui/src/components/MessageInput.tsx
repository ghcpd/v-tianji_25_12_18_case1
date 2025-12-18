import React, { useState } from 'react'
import { useChatStore } from '../store/chatStore'

export default function MessageInput() {
  const [text, setText] = useState('')
  const sendMessage = useChatStore((s) => s.sendMessage)

  const onSend = () => {
    if (!text.trim()) return
    sendMessage(text.trim())
    setText('')
  }

  return (
    <div className="p-3 border-t bg-white flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
        placeholder="Type a message"
        className="flex-1 rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-label="Message input"
      />
      <button onClick={onSend} className="bg-indigo-600 text-white px-3 py-2 rounded-md">
        Send
      </button>
    </div>
  )
}
