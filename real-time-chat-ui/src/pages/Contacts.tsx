import React, { useState } from 'react'
import { useChatStore } from '../store/chatStore'
import Avatar from '../components/Avatar'

export default function Contacts() {
  const contacts = useChatStore((s) => s.contacts)
  const addContact = useChatStore((s) => s.addContact)
  const [name, setName] = useState('')

  const onAdd = () => {
    if (!name.trim()) return
    addContact(name.trim())
    setName('')
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Contacts</h2>
      <div className="mt-4 shadow rounded-md bg-white p-4">
        <div className="flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New contact name" className="flex-1 rounded-md border px-3 py-2" />
          <button onClick={onAdd} className="bg-indigo-600 text-white px-3 py-2 rounded-md">Add</button>
        </div>
        <div className="mt-4 divide-y">
          {contacts.map((c) => (
            <div key={c.id} className="py-3 flex items-center gap-3">
              <Avatar name={c.name} />
              <div>{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
