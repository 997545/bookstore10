"use server"

import { cookies } from "next/headers"
import { getCartByUserId } from "./cart"

export async function getSession() {
  const sessionCookie = cookies().get("session")

  if (!sessionCookie) {
    return { isLoggedIn: false }
  }

  try {
    const session = JSON.parse(sessionCookie.value)

    // Get cart for the user
    if (session.userId) {
      const cart = await getCartByUserId(session.userId)
      return { ...session, cart }
    }

    return session
  } catch (error) {
    return { isLoggedIn: false }
  }
}
