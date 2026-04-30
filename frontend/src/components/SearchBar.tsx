import { Message as MessageType } from '../hooks/useMessages'

export type SearchBarProps = {
  query: string
  setQuery: (value: string) => void
  onSearch: () => void
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  results: MessageType[]
  currentIndex: number
}

export default function SearchBar({
  query,
  setQuery,
  onSearch,
  onNext,
  onPrev,
  onClose,
  results,
  currentIndex,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
      <input
        type="text"
        placeholder="Search in conversation..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        className="text-sm outline-none w-48"
        autoFocus
      />
      {results.length > 0 && (
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {currentIndex + 1} / {results.length}
        </span>
      )}
      <button
        onClick={onPrev}
        className="text-gray-400 hover:text-gray-600 transition"
      >
        ↑
      </button>
      <button
        onClick={onNext}
        className="text-gray-400 hover:text-gray-600 transition"
      >
        ↓
      </button>
      <button
        onClick={onSearch}
        className="text-xs text-pink-500 font-semibold hover:text-pink-600 transition"
      >
        Search
      </button>
      <button
        onClick={onClose}
        className="text-gray-300 hover:text-gray-500 transition"
      >
        ✕
      </button>
    </div>
  )
}
