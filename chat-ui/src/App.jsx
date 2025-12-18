import React, {useState, useMemo} from 'react'
import { initialConversations, initialContacts } from './mockData'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import Contacts from './components/Contacts'
import SearchBar from './components/SearchBar'

function uid(prefix='id'){ return prefix + Math.random().toString(36).slice(2,9) }

export default function App(){
  const [conversations, setConversations] = useState(initialConversations)
  const [contacts, setContacts] = useState(initialContacts)
  const [active, setActive] = useState(conversations[0].id)
  const [filter, setFilter] = useState('')

  const activeConversation = useMemo(()=> conversations.find(c=>c.id===active), [conversations, active])

  const selectThread = (id)=>{
    setActive(id)
    setConversations(prev=> prev.map(c=> c.id===id? {...c, unread:0}: c))
  }

  const sendMessage = (threadId, text)=>{
    const msg = { id: uid('m'), from: 'You', text, ts: Date.now() }
    setConversations(prev=> prev.map(c=> c.id===threadId? {...c, messages: [...c.messages, msg]}: c))

    // simulate an auto-reply
    setTimeout(()=>{
      const reply = { id: uid('m'), from: 'AutoReply', text: 'Got your message: "'+ text.slice(0,60)+'"', ts: Date.now() }
      setConversations(prev=> prev.map(c=> {
        if(c.id===threadId){
          const isActive = threadId===active
          return {...c, messages: [...c.messages, reply], unread: isActive? c.unread : (c.unread || 0) + 1 }
        }
        return c
      }))
    }, 300)
  }

  const addContact = (name)=>{
    const c = { id: uid('c'), name, handle: '@'+name.split(' ')[0].toLowerCase(), color: '#ffe8d6' }
    setContacts(prev=> [c, ...prev])
  }

  return (
    <div className="app" data-testid="app">
      <Sidebar conversations={conversations} onSelect={selectThread} activeId={active} filter={filter} />

      <div>
        <div className="panel" style={{marginBottom:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <h1 style={{margin:0,color:'var(--accent)'}}>Real-Time Chat</h1>
              <small className="small">A frontend-only demo with in-memory data</small>
            </div>
            <div style={{width:360}}>
              <SearchBar value={filter} onChange={setFilter} placeholder="Search chats & messages" />
            </div>
          </div>
        </div>

        <ChatWindow conversation={activeConversation} onSend={sendMessage} />
      </div>

      <Contacts contacts={contacts} onAdd={addContact} />
    </div>
  )
}
