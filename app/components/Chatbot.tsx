"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Button3D from "./Button3D"
import { MessageCircle } from "lucide-react"

interface Message {
  text: string
  sender: "user" | "bot"
}

const initialMessages: Message[] = [{ text: "Hello! How can I assist you today?", sender: "bot" }]

// Define a pool of bot responses
const botReplies = {
  greeting: [
    "Hi there! How can I help you today?",
    "Hello! What can I assist you with?",
    "Greetings! How can I make your day better?",
  ],
  thanks: [
    "You're welcome! Is there anything else you'd like help with?",
    "Happy to assist! Let me know if you have more questions.",
    "No problem at all! What else can I do for you?",
  ],
  product: [
    "We have a wide range of products available. Is there a specific category you're interested in?",
    "Our products are designed with the latest fashion trends in mind. What type of clothing are you looking for?",
    "From casual wear to formal attire, we've got you covered. What's your style preference?",
  ],
  size: [
    "We offer sizes ranging from XS to XXL. If you're unsure about your size, I'd be happy to help you with our size guide.",
    "Finding the right size is crucial. Have you checked our size guide? I can walk you through it if you'd like.",
    "Our sizes are designed to fit a variety of body types. What's your usual size, and I can suggest the best fit for you.",
  ],
  shipping: [
    "We offer free shipping on orders over ₹1000. Standard shipping usually takes 3-5 business days.",
    "Expedited shipping is available for an additional fee. Would you like more information about our shipping options?",
    "We ship to most locations in India. Can you tell me your pincode, and I'll check the estimated delivery time for you?",
  ],
  returns: [
    "We have a hassle-free 30-day return policy for all unworn items with tags intact.",
    "If you're not satisfied with your purchase, you can return it within 30 days for a full refund or exchange.",
    "Returns are easy! Just initiate a return request through your account, and we'll guide you through the process.",
  ],
  customization: [
    "Yes, we offer customization options for many of our products. What kind of customization are you looking for?",
    "Our customization feature allows you to add personal touches to your clothing. Would you like to know more about it?",
    "From adding text to choosing unique designs, our customization options are extensive. What would you like to customize?",
  ],
  fallback: [
    "I'm not sure I understand. Could you rephrase that?",
    "That's an interesting question. Can you provide more details so I can assist you better?",
    "I'm still learning, and I'm not sure about that. Is there something else I can help you with?",
  ],
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  const getBotReply = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase()

    if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
      return botReplies.greeting[Math.floor(Math.random() * botReplies.greeting.length)]
    }

    if (lowercaseMessage.includes("thank you") || lowercaseMessage.includes("thanks")) {
      return botReplies.thanks[Math.floor(Math.random() * botReplies.thanks.length)]
    }

    if (
      lowercaseMessage.includes("product") ||
      lowercaseMessage.includes("clothes") ||
      lowercaseMessage.includes("clothing")
    ) {
      return botReplies.product[Math.floor(Math.random() * botReplies.product.length)]
    }

    if (lowercaseMessage.includes("size") || lowercaseMessage.includes("fit")) {
      return botReplies.size[Math.floor(Math.random() * botReplies.size.length)]
    }

    if (lowercaseMessage.includes("ship") || lowercaseMessage.includes("delivery")) {
      return botReplies.shipping[Math.floor(Math.random() * botReplies.shipping.length)]
    }

    if (lowercaseMessage.includes("return") || lowercaseMessage.includes("refund")) {
      return botReplies.returns[Math.floor(Math.random() * botReplies.returns.length)]
    }

    if (lowercaseMessage.includes("custom") || lowercaseMessage.includes("personalize")) {
      return botReplies.customization[Math.floor(Math.random() * botReplies.customization.length)]
    }

    return botReplies.fallback[Math.floor(Math.random() * botReplies.fallback.length)]
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const userMessage = input.trim()
      setMessages((prev) => [...prev, { text: userMessage, sender: "user" }])
      setInput("")
      setIsTyping(true)

      // Simulate bot thinking and then respond
      setTimeout(() => {
        const botReply = getBotReply(userMessage)
        setMessages((prev) => [...prev, { text: botReply, sender: "bot" }])
        setIsTyping(false)
      }, 1000)
    }
  }

  // Scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages]) // Removed isTyping from dependencies

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button3D className="fixed bottom-4 right-4 rounded-full p-4">
          <MessageCircle className="w-6 h-6" />
        </Button3D>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customer Support</DialogTitle>
        </DialogHeader>
        <div className="mt-4 h-[300px] overflow-y-auto space-y-4" aria-live="polite" role="log">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`rounded-lg p-2 max-w-[70%] transition-all ${
                  message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg p-2 max-w-[70%] bg-gray-200 text-black">Typing...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSend} className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
            aria-label="Type your message"
          />
          <Button3D type="submit" aria-label="Send message">
            Send
          </Button3D>
        </form>
      </DialogContent>
    </Dialog>
  )
}

