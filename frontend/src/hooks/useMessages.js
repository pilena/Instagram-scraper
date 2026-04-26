import { useState, useEffect } from 'react'

export function useMessages(selectedConvo) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (!selectedConvo) return
        fetch(`http://localhost:3000/conversations/${encodeURIComponent(selectedConvo.conversation_id)}/messages`)
            .then(res => res.json())
            .then(data => setMessages(data))
    }, [selectedConvo])

    return messages
}