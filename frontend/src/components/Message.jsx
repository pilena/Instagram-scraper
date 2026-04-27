import { formatTime } from '../utils/formatting'

export default function Message({ msg, owner, isMatch, matchRef }) {
  const isOwner = msg.sender === owner

  return (
    <div
      ref={matchRef}
      className={`flex mb-1 ${isOwner ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl text-sm transition ${
          isMatch
            ? 'ring-2 ring-yellow-400 bg-yellow-50 text-gray-800'
            : isOwner
              ? 'bg-linear-to-br from-pink-500 to-rose-500 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
        }`}
      >
        <p>{msg.message}</p>
        <p
          className={`text-xs mt-1 ${isMatch ? 'text-gray-400' : isOwner ? 'text-pink-100' : 'text-gray-400'}`}
        >
          {formatTime(msg.timestamp)}
        </p>
      </div>
    </div>
  )
}
