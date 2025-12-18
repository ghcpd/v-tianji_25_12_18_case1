import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useStore } from '../state/store'

export default function ChatWindow(){
  const { state, dispatch } = useStore()
  const active = state.conversations.find(c => c.id === state.activeConversationId) || state.conversations[0]
  const [text, setText] = useState('')
  const containerRef = useRef<HTMLDivElement|null>(null)

  const messages = useMemo(() => active ? active.messages : [], [active])

  useEffect(() => {
    const el = containerRef.current as any
    if (!el) return
    if (typeof el.scrollTo === 'function') el.scrollTo({top: el.scrollHeight, behavior: 'smooth'})
    else el.scrollTop = el.scrollHeight
  }, [messages])

  function send(){
    if(!text.trim()) return
    dispatch({type:'send-message', convId: active.id, text: text.trim()})
    setText('')
  }

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      <div className="topbar">
        <div>
          <h3>{active.title}</h3>
          <div className="small">{active.participants.join(', ')}</div>
        </div>
        <div className="small">Last: {new Date(active.messages[active.messages.length-1]?.timestamp||0).toLocaleString()}</div>
      </div>

      <div className="messages" ref={containerRef} role="log">
        {messages.map(m => (
          <div key={m.id} className={`msg ${m.from === 'You' ? 'me' : 'other'}`}>
            <div style={{fontSize:12, opacity:0.8}}>{m.from}</div>
            <div style={{marginTop:6}}>{m.text}</div>
            <div style={{fontSize:11, opacity:0.6, marginTop:6}}>{new Date(m.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>

      <div className="compose">
        <input aria-label="message-input" className="input" value={text} onChange={e=>setText(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter') send()}} placeholder="Write a message" />
        <button aria-label="send-button" className="send" onClick={send}>Send</button>
      </div>
    </div>
  )
}
