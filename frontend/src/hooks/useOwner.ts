import { useState, useEffect } from 'react'

export function useOwner() {
  const [owner, setOwner] = useState<string>('')

  useEffect(() => {
    fetch('http://localhost:3000/owner')
      .then((res) => res.json())
      .then((data: { owner: string }) => setOwner(data.owner))
  }, [])

  return owner
}
