import { useState, useEffect } from 'react'

export function useConversations() {
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/conversations')
            .then(res => res.json())
            .then(data => setConversations(data))
    }, [])

    return conversations
}