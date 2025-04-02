"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const orderStatuses = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"]

export default function OrderTrackingPage() {
  const { orderId } = useParams()
  const [currentStatus, setCurrentStatus] = useState(0)

  useEffect(() => {
    // Simulate order status updates
    const interval = setInterval(() => {
      setCurrentStatus((prevStatus) => {
        if (prevStatus < orderStatuses.length - 1) {
          return prevStatus + 1
        }
        clearInterval(interval)
        return prevStatus
      })
    }, 5000) // Update every 5 seconds for demo purposes

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-secondary">Order Tracking</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order ID: {orderId}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderStatuses.map((status, index) => (
              <div key={status} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStatus ? "bg-green-500" : "bg-gray-300"}`}
                >
                  {index <= currentStatus && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-4">
                  <p className={`font-semibold ${index <= currentStatus ? "text-green-500" : "text-gray-500"}`}>
                    {status}
                  </p>
                  {index < orderStatuses.length - 1 && <div className="mt-1 w-px h-8 bg-gray-300 ml-4"></div>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

