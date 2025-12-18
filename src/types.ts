export type Message = {
  id: string
  from: string
  text: string
  timestamp: number
}

export type Conversation = {
  id: string
  title: string
  participants: string[]
  messages: Message[]
  unread?: number
}

export type Contact = {
  id: string
  name: string
  presence?: 'online' | 'offline'
}
