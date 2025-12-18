import React from 'react'
import { StoreProvider } from './state/store'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'

export default function App(){
  return (
    <StoreProvider>
      <div className="app">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="chat">
          <ChatWindow />
        </div>
      </div>
    </StoreProvider>
  )
}
