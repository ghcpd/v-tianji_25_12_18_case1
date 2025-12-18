import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ConversationList from './components/ConversationList'
import ChatWindow from './components/ChatWindow'
import Contacts from './pages/Contacts'
import SearchBar from './components/SearchBar'

export default function App() {
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Real-Time Chat</h1>
          <nav className="flex gap-3">
            <Link to="/" className="text-slate-600 hover:text-slate-900">Chats</Link>
            <Link to="/contacts" className="text-slate-600 hover:text-slate-900">Contacts</Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 max-w-6xl mx-auto px-4 py-6 w-full">
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/" element={<div className="grid grid-cols-12 gap-6 h-[70vh]">
            <aside className="col-span-4 bg-white rounded-md shadow h-full flex flex-col">
              <SearchBar value={query} onChange={setQuery} />
              <ConversationList query={query} />
            </aside>
            <main className="col-span-8 bg-white rounded-md shadow h-full">
              <ChatWindow />
            </main>
          </div>} />
        </Routes>
      </div>
    </div>
  )
}
