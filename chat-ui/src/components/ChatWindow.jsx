import React, {useRef, useEffect, useState} from 'react'

export default function ChatWindow({conversation, onSend}){
  const [text, setText] = useState('')
  const listRef = useRef()
  useEffect(()=>{ // reset composer when switching conversations
    setText('')
    if(listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [conversation && conversation.id])

  if(!conversation) return (
    <div className="panel chat-window">
      <div className="header"><h1>Conversation</h1><small className="small">Select a thread to start</small></div>
      <div className="empty" style={{marginTop:20}}>No conversation selected.</div>
    </div>
  )

  const send = ()=>{
    if(!text.trim()) return
    onSend(conversation.id, text.trim())
    setText('')
  }

  return (
    <div className="panel chat-window" data-testid="chat-window">
      <div className="header"><h1>{conversation.title}</h1><small className="small">{conversation.participants.join(' • ')}</small></div>
      <div className="messages" ref={listRef} data-testid="messages">
        {conversation.messages.map(m=> (
          <div key={m.id} className={`msg ${m.from==='You'? 'me':'them'}`} data-testid={`msg-${m.id}`}>
            <div style={{fontSize:12,opacity:0.8,marginBottom:6}}>{m.from} · <span className="kv">{new Date(m.ts).toLocaleTimeString()}</span></div>
            <div>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="composer">
        <input placeholder="Write a message..." className="input" value={text} onChange={e=>setText(e.target.value)} data-testid="composer-input" onKeyDown={e=>{ if(e.key==='Enter') send() }} />
        <button className="btn" onClick={()=>{ setText(''); }} data-testid="clear-btn">Clear</button>
        <button className="btn primary" onClick={send} data-testid="send-btn">Send</button>
      </div>
    </div>
  )
}
