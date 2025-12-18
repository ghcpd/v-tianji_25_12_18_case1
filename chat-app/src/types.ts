export interface Contact {
  id: string;
  name: string;
  avatar?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  participants: Contact[];
  messages: Message[];
  lastMessage?: Message;
}