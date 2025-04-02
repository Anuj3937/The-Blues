"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import Button3D from "./Button3D"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { Heart } from "lucide-react"

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist()
  const { toast } = useToast()

  const isInWishlist = wishlist.some((item) => item.id === id)

  const handleAddToCart = async () => {
    try {
      await addToCart({ id, name, price, image, quantity: 1 })
      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add the item to the cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(id)
      toast({
        title: "Removed from wishlist",
        description: `${name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({ id, name, price, image })
      toast({
        title: "Added to wishlist",
        description: `${name} has been added to your wishlist.`,
      })
    }
  }

  // Convert price to Indian Rupees
  const priceInRupees = price * 75 // Assuming 1 USD = 75 INR

  return (
    <motion.div
      className="bg-primary/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/products/${id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 transform hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-semibold mb-2 text-white">{name}</h3>
              <p className="text-blue-300 mb-4">₹{priceInRupees.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-6 space-y-2">
        <div className="flex justify-between items-center">
          <Button3D onClick={async () => await handleAddToCart()} className="flex-grow mr-2">
            Add to Cart
          </Button3D>
          <Button3D onClick={handleWishlistToggle} className="p-2">
            <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500" : ""}`} />
          </Button3D>
        </div>
        <Button3D className="w-full">
          <Link href={`/customize?productId=${id}`} className="block w-full">
            Customize
          </Link>
        </Button3D>
      </div>
    </motion.div>
  )
}

