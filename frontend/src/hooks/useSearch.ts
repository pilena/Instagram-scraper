import { useCallback, useState } from 'react'
import { Message } from './useMessages'
import { Conversation } from './useConversations'

export function useSearch() {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<Message[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const search = useCallback(
    async (selectedConvo: Conversation): Promise<void> => {
      if (!query.trim() || !selectedConvo) return

      const res = await fetch(
        `http://localhost:3000/search/${encodeURIComponent(selectedConvo.conversation_id)}?query=${encodeURIComponent(query)}`
      )
      const data: Message[] = await res.json()
      setResults(data)
      setCurrentIndex(0)
    },
    [query]
  )

  const next = useCallback((): void => {
    if (currentIndex < results.length - 1) setCurrentIndex((i) => i + 1)
  }, [currentIndex, results.length])

  const prev = useCallback((): void => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }, [currentIndex])

  const clear = useCallback((): void => {
    setQuery('')
    setResults([])
    setCurrentIndex(0)
    setIsOpen(false)
  }, [])

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
