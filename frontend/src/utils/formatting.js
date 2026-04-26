export function formatTime(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString([], {
        year: 'numeric', month: 'long', day: 'numeric'
    })
}

export function getNameFromConvoId(conversationId) {
    return conversationId.split('/').pop().split('_')[0]
}

export function getGradient(name) {
    const colors = [
        'from-pink-400 to-rose-500',
        'from-purple-400 to-indigo-500',
        'from-orange-400 to-pink-500',
        'from-green-400 to-teal-500',
        'from-blue-400 to-cyan-500',
        'from-yellow-400 to-orange-500',
    ]
    return colors[name.charCodeAt(0) % colors.length]
}