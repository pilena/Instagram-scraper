import { useState, useEffect } from 'react'
import { Conversation } from './useConversations'

export interface Message {
  id: number
  conversation_id: string
  sender: string
  message: string
  timestamp: string
}

export function useMessages(selectedConvo: Conversation | null): Message[] {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!selectedConvo) return
    fetch(
      `http://localhost:3000/conversations/${encodeURIComponent(selectedConvo.conversation_id)}/messages`
    )
      .then((res) => res.json())
      .then((data: Message[]) => setMessages(data))
  }, [selectedConvo])

  return messages
}
