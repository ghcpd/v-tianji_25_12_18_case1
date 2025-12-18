import React from 'react'

export default function Sidebar({conversations, onSelect, activeId, filter}){
  const list = conversations.filter(c=> c.title.toLowerCase().includes(filter.toLowerCase()) || c.messages.some(m=>m.text.toLowerCase().includes(filter.toLowerCase())))
  return (
    <div className="panel">
      <div className="header">
        <h1>Chats</h1>
        <small className="small">{conversations.length} threads</small>
      </div>
      <div className="list" role="list">
        {list.map(c=> (
          <div key={c.id} role="listitem" className={`item ${activeId===c.id? 'active':''}`} onClick={()=>onSelect(c.id)} data-testid={`thread-${c.id}`}>
            <div className="avatar" style={{background:c.unread? 'linear-gradient(90deg,var(--accent),#5b21b6)':'#e6eef8'}}>{c.title.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div className="name">{c.title}</div>
                  <div className="meta">{c.participants.join(' · ')} • <span className="kv">{new Date(c.messages[c.messages.length-1].ts).toLocaleDateString()}</span></div>
                </div>
                <div style={{marginLeft:12}}>
                  {c.unread? <div className="unread" data-testid={`unread-${c.id}`}>{c.unread}</div> : <div className="kv">{c.messages.length}</div>}
                </div>
              </div>
            </div>
          </div>
        ))}
        {list.length===0 && <div className="empty">No conversations match your search.</div>}
      </div>
    </div>
  )
}
