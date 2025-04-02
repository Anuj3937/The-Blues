"use client"

import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Button3D from "./Button3D"
import { useCart } from "../contexts/CartContext"
import { useToast } from "@/components/ui/use-toast"
import Cloth3DPreview from "./Cloth3DPreview"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Product data (you might want to move this to a separate file)
const products = [
  { id: 1, name: "African Print Shirt", basePrice: 4999, defaultColor: "#ffffff" },
  { id: 2, name: "Classic Suit", basePrice: 14999, defaultColor: "#000000" },
  { id: 3, name: "Casual Shirt", basePrice: 2999, defaultColor: "#ffffff" },
  { id: 4, name: "Formal Shirt", basePrice: 3999, defaultColor: "#ffffff" },
  { id: 5, name: "Stylish Jacket", basePrice: 7999, defaultColor: "#000000" },
]

export default function CustomizeClothes() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId")
  const product = productId ? products.find((p) => p.id === Number.parseInt(productId)) : null

  const [material, setMaterial] = useState("cotton")
  const [size, setSize] = useState("M")
  const [color, setColor] = useState(product?.defaultColor || "#ffffff")
  const [designImage, setDesignImage] = useState<string | null>(null)
  const [designPosition, setDesignPosition] = useState({ x: 0, y: 0 })
  const [designScale, setDesignScale] = useState(0.5)
  const [isPreviewLoading, setIsPreviewLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const basePrice = product?.basePrice || 2999
  const customizationPrice = 1000 // Additional price for customization

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDesignImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddToCart = async () => {
    try {
      const customProduct = {
        id: Date.now(),
        name: product ? `Custom ${product.name}` : "Custom T-Shirt",
        price: basePrice + customizationPrice,
        image: designImage || "/images/custom-tshirt-placeholder.jpg",
        material,
        size,
        color,
        designPosition,
        designScale,
      }
      await addToCart({ ...customProduct, quantity: 1 })
      toast({
        title: "Added to cart",
        description: `Your custom ${product ? product.name.toLowerCase() : "t-shirt"} has been added to the cart.`,
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

  return (
    <div className="bg-primary/30 p-6 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-secondary">
        {product ? `Customize ${product.name}` : "Customize Your T-Shirt"}
      </h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="flex-1">
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="material">Material</Label>
              <select
                id="material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3 py-2 bg-secondary/50 rounded-md text-text mt-1"
              >
                <option value="cotton">100% Cotton</option>
                <option value="polyester">Polyester</option>
                <option value="blend">Cotton-Polyester Blend</option>
              </select>
            </div>

            <div>
              <Label htmlFor="size">Size</Label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 bg-secondary/50 rounded-md text-text mt-1"
              >
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </select>
            </div>

            <div>
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-2 mt-1">
                {["#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00"].map((colorOption) => (
                  <button
                    key={colorOption}
                    onClick={() => setColor(colorOption)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      color === colorOption ? "border-accent" : "border-transparent"
                    }`}
                    style={{ backgroundColor: colorOption }}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="design-upload">Upload Design</Label>
              <input
                id="design-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
              />
              <Button3D onClick={() => fileInputRef.current?.click()} className="w-full mt-1">
                Choose Image
              </Button3D>
              {designImage && (
                <div className="mt-2">
                  <img
                    src={designImage || "/placeholder.svg"}
                    alt="Uploaded design"
                    className="w-full h-40 object-contain rounded-md"
                  />
                </div>
              )}
            </div>

            {designImage && (
              <>
                <div>
                  <Label htmlFor="design-scale">Design Size</Label>
                  <Slider
                    id="design-scale"
                    min={0.1}
                    max={1}
                    step={0.01}
                    value={[designScale]}
                    onValueChange={([value]) => setDesignScale(value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="design-x">Horizontal Position</Label>
                  <Input
                    id="design-x"
                    type="range"
                    min={-0.5}
                    max={0.5}
                    step={0.01}
                    value={designPosition.x}
                    onChange={(e) => setDesignPosition((prev) => ({ ...prev, x: Number.parseFloat(e.target.value) }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="design-y">Vertical Position</Label>
                  <Input
                    id="design-y"
                    type="range"
                    min={-0.5}
                    max={0.5}
                    step={0.01}
                    value={designPosition.y}
                    onChange={(e) => setDesignPosition((prev) => ({ ...prev, y: Number.parseFloat(e.target.value) }))}
                    className="mt-1"
                  />
                </div>
              </>
            )}

            <div className="pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span>Base Price:</span>
                <span>₹{basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Customization:</span>
                <span>₹{customizationPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₹{(basePrice + customizationPrice).toLocaleString()}</span>
              </div>
            </div>

            <Button3D onClick={async () => await handleAddToCart()} className="w-full mt-4">
              Add to Cart - ₹{(basePrice + customizationPrice).toLocaleString()}
            </Button3D>
          </CardContent>
        </Card>

        <div className="flex-1">
          {isPreviewLoading ? (
            <Skeleton className="w-full h-[400px] rounded-lg" />
          ) : (
            <Cloth3DPreview
              clothColor={color}
              designImage={designImage}
              designPosition={designPosition}
              designScale={designScale}
              onLoadingChange={setIsPreviewLoading}
            />
          )}
        </div>
      </div>
    </div>
  )
}

