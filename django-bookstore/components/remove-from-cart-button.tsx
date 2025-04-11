"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { removeFromCart } from "@/lib/cart"

export default function RemoveFromCartButton({ itemId }: { itemId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleRemove = async () => {
    setIsLoading(true)
    try {
      await removeFromCart(itemId)
      router.refresh()
    } catch (error) {
      console.error("Failed to remove from cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleRemove}
      disabled={isLoading}
      className="text-red-600 hover:text-red-900 disabled:text-red-400"
    >
      {isLoading ? "Removing..." : "Remove"}
    </button>
  )
}
