"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface LoyaltyContextType {
  points: number
  addPoints: (amount: number) => void
  usePoints: (amount: number) => boolean
  getDiscount: (totalAmount: number) => number
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined)

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(0)

  useEffect(() => {
    const savedPoints = localStorage.getItem("loyaltyPoints")
    if (savedPoints) {
      setPoints(Number.parseInt(savedPoints))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("loyaltyPoints", points.toString())
  }, [points])

  const addPoints = (amount: number) => {
    setPoints((prevPoints) => prevPoints + Math.floor(amount))
  }

  const usePoints = (amount: number) => {
    if (points >= amount) {
      setPoints((prevPoints) => prevPoints - amount)
      return true
    }
    return false
  }

  const getDiscount = (totalAmount: number) => {
    const discountPercentage = Math.min(points / 100, 20) // Max 20% discount
    return Math.min(totalAmount * (discountPercentage / 100), points) // Discount can't exceed available points
  }

  return (
    <LoyaltyContext.Provider value={{ points, addPoints, usePoints, getDiscount }}>{children}</LoyaltyContext.Provider>
  )
}

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext)
  if (context === undefined) {
    throw new Error("useLoyalty must be used within a LoyaltyProvider")
  }
  return context
}

