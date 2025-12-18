import React, { useMemo, useState } from 'react'
import { useStore } from '../state/store'

export default function Sidebar(){
  const { state, dispatch } = useStore()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => state.conversations.filter(c => c.title.toLowerCase().includes(query.toLowerCase())), [state.conversations, query])

  return (
    <div>
      <div className="header">
        <h3>Chats</h3>
        <div className="small">Online</div>
      </div>
      <div className="search">
        <input aria-label="search" className="search-input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search conversations" />
      </div>
      <div className="conversation-list" role="list">
        {filtered.map((c) => (
          <div key={c.id} role="listitem" className="conversation-item" onClick={() => dispatch({type:'select-conversation', id: c.id})}>
            <div className="avatar">{c.title.split(' ').map(s => s[0]).slice(0,2).join('')}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div><strong>{c.title}</strong></div>
                <div className="small">{new Date(c.messages[c.messages.length-1].timestamp).toLocaleTimeString()}</div>
              </div>
              <div className="small">{c.messages[c.messages.length-1].text}</div>
            </div>
            {c.unread ? <div className="unread">{c.unread}</div> : null}
          </div>
        ))}
      </div>
      <div className="topbar" style={{marginTop:8}}>
        <h4>Contacts</h4>
        <button onClick={() => { const name = prompt('New contact name'); if(name) dispatch({type:'add-contact', contact:{id: 'c'+Math.random().toString(36).slice(2,6), name, presence:'offline'}}) }}>Add</button>
      </div>
      <div className="contact-list small">
        {state.contacts.map(c => (
          <div key={c.id} className="contact-item">{c.name} <span style={{color:'var(--muted)'}}>• {c.presence}</span></div>
        ))}
      </div>
    </div>
  )
}
