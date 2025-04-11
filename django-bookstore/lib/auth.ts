"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Mock user database
const users = [
  {
    id: "1",
    username: "user1",
    email: "user1@example.com",
    password: "password123",
  },
  {
    id: "2",
    username: "user2",
    email: "user2@example.com",
    password: "password123",
  },
]

export async function login(username: string, password: string) {
  // In a real app, you would hash the password and check against a database
  const user = users.find((u) => u.username === username && u.password === password)

  if (!user) {
    throw new Error("Invalid credentials")
  }

  // Set session cookie
  cookies().set(
    "session",
    JSON.stringify({
      userId: user.id,
      username: user.username,
      isLoggedIn: true,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    },
  )

  return { success: true }
}

export async function register(username: string, email: string, password: string) {
  // Check if username or email already exists
  if (users.some((u) => u.username === username || u.email === email)) {
    throw new Error("Username or email already exists")
  }

  // In a real app, you would hash the password and store in a database
  const newUser = {
    id: `${users.length + 1}`,
    username,
    email,
    password, // In a real app, this would be hashed
  }

  users.push(newUser)

  return { success: true }
}

export async function logout() {
  cookies().delete("session")
  redirect("/login")
}
