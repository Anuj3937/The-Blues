"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "../contexts/CartContext"
import Button3D from "../components/Button3D"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const router = useRouter()
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-300">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center mb-4 bg-blue-800/30 p-4 rounded-lg">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-md mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-blue-300">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  +
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500">
                Remove
              </button>
            </div>
          ))}
          <div className="mt-8">
            <p className="text-2xl font-bold">Total: ₹{total.toFixed(2)}</p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="mr-2"
                  />
                  Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="mr-2"
                  />
                  UPI
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mr-2"
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>
            <Button3D onClick={handleCheckout} className="mt-4">
              Proceed to Checkout
            </Button3D>
          </div>
        </>
      )}
    </div>
  )
}

