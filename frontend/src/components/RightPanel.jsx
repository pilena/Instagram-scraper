import MessageList from './MessageList'
import SearchBar from './SearchBar'
import { getNameFromConvoId } from '../utils/formatting'
import { useSearch } from '../hooks/useSearch'

export default function RightPanel({ selectedConvo, messages, owner }) {
  const name = selectedConvo
    ? getNameFromConvoId(selectedConvo.conversation_id)
    : null
  const {
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
    currentMatch,
  } = useSearch(selectedConvo)

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">
          {name ?? 'Select a conversation'}
        </h2>
        {selectedConvo && (
          <div className="flex items-center gap-2">
            {isOpen ? (
              <SearchBar
                query={query}
                setQuery={setQuery}
                onSearch={search}
                onNext={next}
                onPrev={prev}
                onClose={clear}
                results={results}
                currentIndex={currentIndex}
              />
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="text-sm text-gray-400 hover:text-pink-500 transition"
              >
                🔍 Search
              </button>
            )}
          </div>
        )}
      </div>

      {!selectedConvo ? (
        <p className="text-sm text-gray-400 text-center mt-10">
          Click a conversation to open it
        </p>
      ) : (
        <MessageList
          messages={messages}
          owner={owner}
          currentMatch={currentMatch}
        />
      )}
    </div>
  )
}
