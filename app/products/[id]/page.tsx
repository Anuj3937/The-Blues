"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { useCart } from "../../contexts/CartContext"
import { useWishlist } from "../../contexts/WishlistContext"
import { useToast } from "@/components/ui/use-toast"
import Button3D from "../../components/Button3D"
import ReviewForm from "../../components/ReviewForm"
import { Star, Heart } from "lucide-react"

interface Review {
  id: number
  rating: number
  comment: string
  userName: string
  date: string
}

const products = [
  {
    id: 1,
    name: "Neon Pulse Jacket",
    price: 4999,
    image: "/images/neon-pulse-jacket.jpg",
    description:
      "Illuminate the night with our Neon Pulse Jacket. Featuring dynamic LED threading and adaptive thermal regulation.",
  },
  {
    id: 2,
    name: "Quantum Shift Pants",
    price: 3499,
    image: "/images/quantum-shift-pants.jpg",
    description:
      "Experience comfort at the quantum level. These pants adapt to your body's movement for unparalleled flexibility.",
  },
  {
    id: 3,
    name: "Holographic Horizon Shirt",
    price: 2999,
    image: "/images/holographic-horizon-shirt.jpg",
    description: "A shirt that changes with your mood. Holographic fabric creates stunning visual effects as you move.",
  },
  {
    id: 4,
    name: "Cybernetic Synth Boots",
    price: 5999,
    image: "/images/cybernetic-synth-boots.jpg",
    description: "Step into the future with boots that generate energy as you walk, powering your devices on the go.",
  },
  {
    id: 5,
    name: "Nebula Glow Dress",
    price: 6999,
    image: "/images/nebula-glow-dress.jpg",
    description:
      "Be the center of attention with this dress inspired by distant galaxies. Features subtle bioluminescent accents.",
  },
  {
    id: 6,
    name: "Plasma Pulse Gloves",
    price: 1999,
    image: "/images/plasma-pulse-gloves.jpg",
    description: "Stay connected with these touch-sensitive gloves. Control your devices with intuitive gestures.",
  },
]

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number.parseInt(id as string))
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist()
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])

  const isInWishlist = wishlist.some((item) => item.id === product?.id)

  useEffect(() => {
    // Fetch reviews from API (simulated here)
    const fetchedReviews: Review[] = [
      { id: 1, rating: 5, comment: "Amazing product!", userName: "John Doe", date: "2023-06-01" },
      { id: 2, rating: 4, comment: "Great quality, but a bit pricey.", userName: "Jane Smith", date: "2023-05-28" },
    ]
    setReviews(fetchedReviews)
  }, [id])

  if (!product) {
    return <div className="container mx-auto px-6 py-8 text-center">Product not found</div>
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    const newReview: Review = {
      id: reviews.length + 1,
      ...review,
      userName: "Current User", // In a real app, get this from the authenticated user
      date: new Date().toISOString().split("T")[0],
    }
    setReviews([newReview, ...reviews])
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row">
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg shadow-2xl"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2 md:pl-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-secondary">{product.name}</h1>
          <p className="text-2xl mb-4 text-primary">₹{product.price.toFixed(2)}</p>
          <p className="mb-6 text-text">{product.description}</p>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= averageRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span>({reviews.length} reviews)</span>
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2 text-text">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
              className="w-16 px-2 py-1 border rounded text-black"
            />
          </div>
          <div className="flex space-x-2">
            <Button3D onClick={handleAddToCart} className="flex-grow">
              Add to Cart
            </Button3D>
            <Button3D onClick={handleWishlistToggle} className="p-2">
              <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500" : ""}`} />
            </Button3D>
          </div>
        </motion.div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-secondary">Customer Reviews</h2>
        <ReviewForm productId={product.id} onReviewSubmit={handleReviewSubmit} />
        <div className="mt-8 space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{review.userName}</span>
                <span className="text-sm text-gray-500 ml-2">{review.date}</span>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

