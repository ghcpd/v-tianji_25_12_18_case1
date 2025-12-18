import './App.css'
import ConversationList from './components/ConversationList'
import ChatView from './components/ChatView'
import MessageInput from './components/MessageInput'
import { useChatStore } from './store/chatStore'

function App() {
  const searchTerm = useChatStore((s) => s.searchTerm)
  const setSearchTerm = useChatStore((s) => s.setSearchTerm)

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ConversationList />
      </div>
      <div className="main">
        <ChatView />
        <MessageInput />
      </div>
    </div>
  )
}

export default App
