export function addMessage(conversations, threadId, from, text, ts = Date.now()){
  const msg = { id: 'm'+Math.random().toString(36).slice(2,9), from, text, ts }
  return conversations.map(c=> c.id===threadId? {...c, messages: [...c.messages, msg]}: c)
}

export function addAutoReply(conversations, threadId, text, activeThreadId){
  const reply = { id: 'm'+Math.random().toString(36).slice(2,9), from: 'AutoReply', text: 'Got your message: "'+ text.slice(0,60)+'"', ts: Date.now() }
  return conversations.map(c=>{
    if(c.id!==threadId) return c
    const isActive = threadId === activeThreadId
    return {...c, messages: [...c.messages, reply], unread: isActive? c.unread : (c.unread || 0) + 1 }
  })
}

export function addContact(contacts, name){
  const c = { id: 'c'+Math.random().toString(36).slice(2,8), name, handle: '@'+name.split(' ')[0].toLowerCase(), color: '#fff' }
  return [c, ...contacts]
}

export function filterConversations(conversations, q){
  const s = (q||'').toLowerCase().trim()
  if(!s) return conversations
  return conversations.filter(c=> c.title.toLowerCase().includes(s) || c.messages.some(m=> m.text.toLowerCase().includes(s)))
}
