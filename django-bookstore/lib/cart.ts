"use server"
import { getSession } from "./session"
import { getBookById } from "./books"

// Mock cart database
const carts: {
  id: string
  userId: string
  items: {
    id: string
    bookId: string
    quantity: number
  }[]
}[] = []

export async function getCartByUserId(userId: string) {
  // In a real app, you would fetch from a database
  let cart = carts.find((cart) => cart.userId === userId)

  if (!cart) {
    // Create a new cart if one doesn't exist
    cart = {
      id: `cart_${Date.now()}`,
      userId,
      items: [],
    }
    carts.push(cart)
  }

  return cart
}

export async function getCartWithItems() {
  const session = await getSession()

  if (!session.isLoggedIn || !session.userId) {
    return { items: [] }
  }

  const cart = await getCartByUserId(session.userId)

  // Fetch book details for each item
  const itemsWithDetails = await Promise.all(
    cart.items.map(async (item) => {
      const book = await getBookById(item.bookId)
      return {
        id: item.id,
        quantity: item.quantity,
        book: book || { id: item.bookId, title: "Unknown Book", price: 0 },
      }
    }),
  )

  return { ...cart, items: itemsWithDetails }
}

export async function addToCart(bookId: string, quantity: number) {
  const session = await getSession()

  if (!session.isLoggedIn || !session.userId) {
    throw new Error("User not logged in")
  }

  const cart = await getCartByUserId(session.userId)

  // Check if the book already exists in the cart
  const existingItemIndex = cart.items.findIndex((item) => item.bookId === bookId)

  if (existingItemIndex >= 0) {
    // Update quantity if the book is already in the cart
    cart.items[existingItemIndex].quantity += quantity
  } else {
    // Add new item if the book is not in the cart
    cart.items.push({
      id: `item_${Date.now()}`,
      bookId,
      quantity,
    })
  }

  // Update the cart in the "database"
  const cartIndex = carts.findIndex((c) => c.id === cart.id)
  if (cartIndex >= 0) {
    carts[cartIndex] = cart
  } else {
    carts.push(cart)
  }

  return { success: true }
}

export async function removeFromCart(itemId: string) {
  const session = await getSession()

  if (!session.isLoggedIn || !session.userId) {
    throw new Error("User not logged in")
  }

  const cart = await getCartByUserId(session.userId)

  // Remove the item from the cart
  cart.items = cart.items.filter((item) => item.id !== itemId)

  // Update the cart in the "database"
  const cartIndex = carts.findIndex((c) => c.id === cart.id)
  if (cartIndex >= 0) {
    carts[cartIndex] = cart
  }

  return { success: true }
}
