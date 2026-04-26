import { useState, useEffect } from 'react'

export function useOwner() {
    const [owner, setOwner] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/owner')
            .then(res => res.json())
            .then(data => setOwner(data.owner))
    }, [])

    return owner
}