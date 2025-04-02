"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "../contexts/CartContext"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Button3D from "../components/Button3D"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLoyalty } from "../contexts/LoyaltyContext"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  })
  const { points, addPoints, getDiscount } = useLoyalty()
  const [usePointsForDiscount, setUsePointsForDiscount] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = usePointsForDiscount ? getDiscount(subtotal) : 0
  const total = subtotal - discount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order data to your backend
    // For this example, we'll simulate a successful order
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

    const orderId = `ORD-${Date.now()}`
    addPoints(Math.floor(total)) // Add loyalty points based on the total amount spent
    clearCart()
    toast({
      title: "Order Placed Successfully",
      description: `Your order ID is ${orderId}. You can track your order in the My Orders section.`,
    })
    router.push(`/order-tracking/${orderId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-secondary">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={shippingAddress.addressLine1}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  value={shippingAddress.addressLine2}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" value={shippingAddress.state} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="use-points"
                  checked={usePointsForDiscount}
                  onCheckedChange={(checked) => setUsePointsForDiscount(checked as boolean)}
                />
                <Label htmlFor="use-points">Use loyalty points for discount (Available: {points} points)</Label>
              </div>
              <Button3D type="submit" className="w-full">
                Place Order - ₹{total.toLocaleString()}
              </Button3D>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {usePointsForDiscount && (
                <div className="flex justify-between items-center text-green-500">
                  <span>Discount (Loyalty Points)</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center font-bold mt-2">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

