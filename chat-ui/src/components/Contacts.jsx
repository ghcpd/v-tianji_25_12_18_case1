import React, {useState} from 'react'

export default function Contacts({contacts, onAdd}){
  const [name, setName] = useState('')
  return (
    <div className="panel contacts">
      <div className="header"><h1>Contacts</h1><small className="small">Manage people</small></div>
      <div className="search" style={{marginTop:8}}>
        <input className="input" placeholder="Add contact name" value={name} onChange={e=>setName(e.target.value)} data-testid="contact-input" />
        <button className="btn" onClick={()=>{ if(name.trim()){ onAdd(name.trim()); setName('') } }} data-testid="add-contact">Add</button>
      </div>

      <div style={{marginTop:12}} className="list">
        {contacts.length===0 && <div className="empty">No contacts yet.</div>}
        {contacts.map(c=> (
          <div key={c.id} className="contact item" data-testid={`contact-${c.id}`}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div className="avatar" style={{background:c.color,color:'#021'}}>{c.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
              <div>
                <div className="name">{c.name}</div>
                <div className="meta">{c.handle} <span className="kv">· {Math.floor(Math.random()*100)} shared messages</span></div>
              </div>
            </div>
            <div className="kv badge">Profile</div>
          </div>
        ))}
      </div>

      <div className="footer-small">Tip: add a contact and start a new chat by selecting them in Contacts and composing a message in the main panel.</div>
    </div>
  )
}
