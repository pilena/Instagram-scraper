import { useRef, useEffect } from 'react'
import Message from './Message'
import { formatDate } from '../utils/formatting'
import { Message as MessageType } from '../hooks/useMessages'

export type MessageListProps = {
  messages: MessageType[]
  owner: string
  currentMatch: MessageType | null
}

export default function MessageList({
  messages,
  owner,
  currentMatch,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const matchRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when conversation first loads
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'instant' })
    }, 50)
  }, [messages])

  // Scroll to match when search result changes
  useEffect(() => {
    if (currentMatch) {
      setTimeout(() => {
        matchRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 50)
    }
  }, [currentMatch])

  const groupedMessages = messages.reduce<Record<string, MessageType[]>>(
    (groups, msg) => {
      const date = formatDate(msg.timestamp)
      if (!groups[date]) groups[date] = []
      groups[date].push(msg)
      return groups
    },
    {}
  )

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date}>
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">{date}</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          {msgs.map((msg) => (
            <Message
              key={msg.id}
              msg={msg}
              owner={owner}
              isMatch={currentMatch?.id === msg.id}
              matchRef={currentMatch?.id === msg.id ? matchRef : null}
            />
          ))}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
