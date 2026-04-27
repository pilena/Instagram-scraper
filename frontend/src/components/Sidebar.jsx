import { getNameFromConvoId, getGradient } from '../utils/formatting'

export default function Sidebar({
  conversations,
  selectedConvo,
  onSelect,
  owner,
}) {
  return (
    <div className="w-80 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-800">Messages</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((convo) => {
          const name = getNameFromConvoId(convo.conversation_id)
          const isSelected =
            selectedConvo?.conversation_id === convo.conversation_id
          const gradient = getGradient(name)
          const isYou = convo.last_sender === owner
          const preview =
            convo.last_message?.length > 35
              ? convo.last_message.slice(0, 35) + '...'
              : convo.last_message

          return (
            <div
              key={convo.conversation_id}
              onClick={() => onSelect(convo)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition ${
                isSelected ? 'bg-gray-100' : ''
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full bg-linear-to-br ${gradient} flex items-center justify-center text-white font-semibold text-sm shrink-0`}
              >
                {name[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {isYou ? 'You: ' : ''}
                  {preview}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
