"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Button3D from "./Button3D"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GiftCard() {
  const [amount, setAmount] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the gift card data to your backend
    console.log("Gift card details:", { amount, recipientEmail, message })
    toast({
      title: "Gift Card Sent",
      description: `A gift card of ₹${amount} has been sent to ${recipientEmail}`,
    })
    setAmount("")
    setRecipientEmail("")
    setMessage("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send a Gift Card</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="100"
              step="100"
            />
          </div>
          <div>
            <Label htmlFor="email">Recipient's Email</Label>
            <Input
              id="email"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Message (optional)</Label>
            <Input id="message" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={200} />
          </div>
          <Button3D type="submit">Send Gift Card</Button3D>
        </form>
      </CardContent>
    </Card>
  )
}

