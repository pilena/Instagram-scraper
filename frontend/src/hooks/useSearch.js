import { useState } from 'react'

export function useSearch(selectedConvo) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const search = async () => {
    if (!query.trim() || !selectedConvo) return

    const res = await fetch(
      `http://localhost:3000/search/${encodeURIComponent(selectedConvo.conversation_id)}?query=${encodeURIComponent(query)}`
    )
    const data = await res.json()
    setResults(data)
    setCurrentIndex(0)
  }

  const next = () => {
    if (currentIndex < results.length - 1) setCurrentIndex((i) => i + 1)
  }

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  const clear = () => {
    setQuery('')
    setResults([])
    setCurrentIndex(0)
    setIsOpen(false)
  }

  return {
    query,
    setQuery,
    results,
    currentIndex,
    isOpen,
    setIsOpen,
    search,
    next,
    prev,
    clear,
    currentMatch: results[currentIndex] ?? null,
  }
}
