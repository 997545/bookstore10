import Link from "next/link"
import { redirect } from "next/navigation"
import BookList from "@/components/book-list"
import { getSession } from "@/lib/session"

export default async function Home() {
  const session = await getSession()

  // If not logged in, redirect to login page
  if (!session.isLoggedIn) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Django Bookstore</h1>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-blue-600 hover:underline">
            Cart ({session.cart?.items?.length || 0})
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Logout
            </button>
          </form>
        </div>
      </div>
      <BookList />
    </div>
  )
}
