import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const conversations = [
  {
    id: '1',
    name: 'Alice Johnson',
    lastMessage: 'Thanks for your proposal. Can we discuss further?',
    avatar: '/avatars/alice.jpg',
  },
  {
    id: '2',
    name: 'Bob Smith',
    lastMessage: "I've reviewed your portfolio. When can you start?",
    avatar: '/avatars/bob.jpg',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    lastMessage: 'Could you provide more details about your experience?',
    avatar: '/avatars/charlie.jpg',
  },
]

const messages = [
  { id: '1', sender: 'Alice Johnson', content: 'Hi, I saw your proposal for the smart contract project.', timestamp: '10:30 AM' },
  { id: '2', sender: 'You', content: "Hello Alice! Yes, I'm very interested in the project.', timestamp: '10:32 AM" },
  { id: '3', sender: 'Alice Johnson', content: 'Great! Can you tell me more about your experience with Solidity?', timestamp: '10:35 AM' },
  { id: '4', sender: 'You', content: 'I have 3 years of experience working with Solidity...', timestamp: '10:40 AM' },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Sending message:', newMessage)
    setNewMessage('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center space-x-4 p-2 hover:bg-accent rounded-lg cursor-pointer ${
                    selectedConversation.id === conversation.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <Avatar>
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{conversation.name}</p>
                    <p className="text-sm text-muted-foreground">{conversation.lastMessage}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{selectedConversation.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}>
                  <p className="text-sm font-medium">{message.sender}</p>
                  <div className={`inline-block p-2 rounded-lg ${message.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-accent'}`}>
                    {message.content}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit">Send</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}