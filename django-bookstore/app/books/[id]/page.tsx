import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getBookById } from "@/lib/books"
import AddToCartButton from "@/components/add-to-cart-button"
import { getSession } from "@/lib/session"

export default async function BookDetail({ params }: { params: { id: string } }) {
  const session = await getSession()

  // If not logged in, redirect to login page
  if (!session.isLoggedIn) {
    redirect("/login")
  }

  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to Books
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <Image
            src={book.coverImage || "/placeholder.svg?height=400&width=300"}
            alt={book.title}
            width={300}
            height={400}
            className="w-full h-auto object-cover rounded"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
          <p className="text-2xl font-bold text-green-700 mb-4">${book.price.toFixed(2)}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Publisher</h2>
            <p>{book.publisher}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{book.description}</p>
          </div>

          <AddToCartButton bookId={book.id} />

          <div className="mt-6">
            <Link href="/cart" className="inline-block bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">
              View Cart ({session.cart?.items?.length || 0})
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
