"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Button3D from "./Button3D"

interface Product {
  id: number
  name: string
  price: number
  material: string
  features: string[]
}

const products: Product[] = [
  {
    id: 1,
    name: "Neon Pulse Jacket",
    price: 4999,
    material: "Smart Fabric",
    features: ["LED threading", "Adaptive thermal regulation", "Water-resistant"],
  },
  {
    id: 2,
    name: "Quantum Shift Pants",
    price: 3499,
    material: "Nano-fiber blend",
    features: ["Shape memory", "Stain-resistant", "4-way stretch"],
  },
  {
    id: 3,
    name: "Holographic Horizon Shirt",
    price: 2999,
    material: "Holographic fabric",
    features: ["Color-changing", "UV protection", "Moisture-wicking"],
  },
  {
    id: 4,
    name: "Cybernetic Synth Boots",
    price: 5999,
    material: "Smart leather",
    features: ["Energy generation", "Self-lacing", "Temperature control"],
  },
]

export default function ProductComparison() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const { toast } = useToast()

  const handleProductSelect = (productId: string) => {
    const product = products.find((p) => p.id === Number.parseInt(productId))
    if (product && !selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts((prev) => [...prev, product])
    }
  }

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const handleCompare = () => {
    if (selectedProducts.length < 2) {
      toast({
        title: "Not enough products",
        description: "Please select at least two products to compare.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Comparison ready",
        description: "You can now compare the selected products.",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Select onValueChange={handleProductSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button3D onClick={handleCompare}>Compare</Button3D>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {product.name}
                <button onClick={() => handleRemoveProduct(product.id)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Price: ₹{product.price}</p>
              <p>Material: {product.material}</p>
              <ul className="list-disc list-inside">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

