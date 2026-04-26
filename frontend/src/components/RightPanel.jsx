import MessageList from './MessageList'
import { getNameFromConvoId } from '../utils/formatting'

export default function RightPanel({ selectedConvo, messages, owner }) {
    const name = selectedConvo ? getNameFromConvoId(selectedConvo.conversation_id) : null

    return (
        <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800">
                    {name ?? 'Select a conversation'}
                </h2>
            </div>

            {!selectedConvo ? (
                <p className="text-sm text-gray-400 text-center mt-10">
                    Click a conversation to open it
                </p>
            ) : (
                <MessageList messages={messages} owner={owner} />
            )}
        </div>
    )
}