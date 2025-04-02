"use client"

import Link from "next/link"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, ShoppingCart, Search, Gift, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useColorScheme } from "./ThemeProvider"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "./AuthProvider"
import { useLoyalty } from "../contexts/LoyaltyContext"
import Button3D from "./Button3D"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const { points } = useLoyalty()

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-primary/30 backdrop-blur-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-accent hover:text-text transition-colors">
            <motion.span initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              The Blues
            </motion.span>
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/products" className="text-text hover:text-accent transition-colors">
              Products
            </Link>
            <Link href="/customize" className="text-text hover:text-accent transition-colors">
              Customize
            </Link>
            <Link href="/virtual-try-on" className="text-text hover:text-accent transition-colors">
              Virtual Try-On
            </Link>
            <Link href="/compare" className="text-text hover:text-accent transition-colors">
              Compare
            </Link>
            <Link href="/search" className="text-text hover:text-accent transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark")
                toggleColorScheme()
              }}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              {colorScheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="relative">
              <Link href="/cart" className="p-2 rounded-full hover:bg-secondary transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
            <Link href="/gift-cards" className="text-text hover:text-accent transition-colors">
              <Gift className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>{points} points</span>
            </div>
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile" className="text-text hover:text-accent transition-colors">
                  {user.name}
                </Link>
                <Button3D onClick={logout} className="text-sm">
                  Logout
                </Button3D>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button3D className="text-sm">Login</Button3D>
                </Link>
                <Link href="/register">
                  <Button3D className="text-sm">Register</Button3D>
                </Link>
              </div>
            )}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/products" className="block text-secondary hover:text-text transition-colors">
              Products
            </Link>
            <Link href="/customize" className="block text-secondary hover:text-text transition-colors">
              Customize
            </Link>
            <Link href="/virtual-try-on" className="block text-secondary hover:text-text transition-colors">
              Virtual Try-On
            </Link>
            <Link href="/compare" className="block text-secondary hover:text-text transition-colors">
              Compare
            </Link>
            <Link href="/search" className="block text-secondary hover:text-text transition-colors">
              Search
            </Link>
            <Link href="/cart" className="block text-secondary hover:text-text transition-colors">
              Cart
            </Link>
            <Link href="/gift-cards" className="block text-secondary hover:text-text transition-colors">
              Gift Cards
            </Link>
            <div className="block text-secondary">
              <Star className="w-5 h-5 text-yellow-400 inline-block mr-2" />
              {points} points
            </div>
            {user ? (
              <>
                <Link href="/profile" className="block text-secondary hover:text-text transition-colors">
                  {user.name}
                </Link>
                <button onClick={logout} className="block text-secondary hover:text-text transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-secondary hover:text-text transition-colors">
                  Login
                </Link>
                <Link href="/register" className="block text-secondary hover:text-text transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

