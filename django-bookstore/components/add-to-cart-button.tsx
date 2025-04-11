"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addToCart } from "@/lib/cart"

export default function AddToCartButton({ bookId }: { bookId: string }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart(bookId, quantity)
      router.refresh()
    } catch (error) {
      console.error("Failed to add to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-gray-200 px-3 py-1 rounded-l">
          -
        </button>
        <span className="bg-gray-100 px-4 py-1">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-200 px-3 py-1 rounded-r">
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
      >
        {isLoading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  )
}
