export function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getNameFromConvoId(conversationId: string): string {
  const parts = conversationId.split('/')
  const lastPart = parts.pop()
  if (!lastPart) return conversationId
  return lastPart.split('_')[0] ?? conversationId
}

export function getGradient(name: string): string {
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
