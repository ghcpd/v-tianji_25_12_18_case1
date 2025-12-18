import { Message, Conversation } from '../types'

// very small mock realtime service that calls listeners with new messages
export type MessageListener = (convId: string, msg: Message) => void

class MockRealtime {
  listeners: MessageListener[] = []
  intervalId: any = null

  start() {
    if (this.intervalId) return
    this.intervalId = setInterval(() => {
      // produce a random message in random conversation
      const convId = Math.random() > 0.5 ? 'conv-1' : 'conv-2'
      const msg: Message = {
        id: Math.random().toString(36).slice(2, 9),
        from: 'Alice',
        text: ['Hey!', 'How are you?', 'Are you there?', 'Ping!'][Math.floor(Math.random() * 4)],
        timestamp: Date.now(),
      }
      this.listeners.forEach((l) => l(convId, msg))
    }, 5000)
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId)
    this.intervalId = null
  }

  onMessage(listener: MessageListener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }
}

export const realtime = new MockRealtime()
