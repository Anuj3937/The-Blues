"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Button3D from "./Button3D"
import { Star } from "lucide-react"

interface ReviewFormProps {
  productId: number
  onReviewSubmit: (review: { rating: number; comment: string }) => void
}

export default function ReviewForm({ productId, onReviewSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating",
        variant: "destructive",
      })
      return
    }
    onReviewSubmit({ rating, comment })
    setRating(0)
    setComment("")
    toast({
      title: "Review Submitted",
      description: "Thank you for your review!",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="rating">Rating</Label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
              <Star className={`w-6 h-6 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full"
          rows={4}
        />
      </div>
      <Button3D type="submit">Submit Review</Button3D>
    </form>
  )
}

