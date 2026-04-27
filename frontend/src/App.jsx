import { useState } from 'react'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import { useOwner } from './hooks/useOwner'
import { useConversations } from './hooks/useConversations'
import { useMessages } from './hooks/useMessages'

function App() {
  const [selectedConvo, setSelectedConvo] = useState(null)
  const owner = useOwner()
  const conversations = useConversations()
  const messages = useMessages(selectedConvo)

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        conversations={conversations}
        selectedConvo={selectedConvo}
        onSelect={setSelectedConvo}
        owner={owner}
      />
      <RightPanel
        selectedConvo={selectedConvo}
        messages={messages}
        owner={owner}
      />
    </div>
  )
}

export default App
