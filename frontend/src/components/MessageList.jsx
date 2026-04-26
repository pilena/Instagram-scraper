import { useRef, useEffect } from 'react'
import Message from './Message'
import { formatDate } from '../utils/formatting'

export default function MessageList({ messages, owner }) {
    const bottomRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'instant' })
        }, 50)
    }, [messages])

    const groupedMessages = messages.reduce((groups, msg) => {
        const date = formatDate(msg.timestamp)
        if (!groups[date]) groups[date] = []
        groups[date].push(msg)
        return groups
    }, {})

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
                        <Message key={msg.id} msg={msg} owner={owner} />
                    ))}
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    )
}