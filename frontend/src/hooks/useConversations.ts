import { useState, useEffect } from 'react'

export interface Conversation {
  conversation_id: string
  last_message_time: string
  message_count: number
  last_message: string
  last_sender: string
}

export function useConversations(): Conversation[] {
  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/conversations')
      .then((res) => res.json())
      .then((data: Conversation[]) => setConversations(data))
  }, [])

  return conversations
}
