import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { ThemeProvider } from "./components/ThemeProvider"
import { CartProvider } from "./contexts/CartContext"
import { AuthProvider } from "./components/AuthProvider"
import { WishlistProvider } from "./contexts/WishlistContext"
import { LoyaltyProvider } from "./contexts/LoyaltyContext"
import { Toaster } from "@/components/ui/toaster"
import SizeGuide from "./components/SizeGuide"
import NewsletterSubscription from "./components/NewsletterSubscription"
import Chatbot from "./components/Chatbot"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "The Blues - Futuristic Clothing",
  description: "Experience the future of fashion with The Blues",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <LoyaltyProvider>
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer>
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h3>
                      <NewsletterSubscription />
                    </div>
                  </Footer>
                  <Toaster />
                  <SizeGuide />
                  <Chatbot />
                </LoyaltyProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'