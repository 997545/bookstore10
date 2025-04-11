import Link from "next/link"
import Image from "next/image"
import { getBooks } from "@/lib/books"

export default async function BookList() {
  const books = await getBooks()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <div key={book.id} className="bg-white rounded-lg shadow overflow-hidden">
          <Link href={`/books/${book.id}`}>
            <div className="h-64 overflow-hidden">
              <Image
                src={book.coverImage || "/placeholder.svg?height=256&width=200"}
                alt={book.title}
                width={200}
                height={256}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
          </Link>

          <div className="p-4">
            <Link href={`/books/${book.id}`}>
              <h2 className="text-lg font-semibold mb-1 hover:text-blue-600">{book.title}</h2>
            </Link>
            <p className="text-gray-600 mb-2">{book.author}</p>
            <p className="text-green-700 font-bold">${book.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-2">Publisher: {book.publisher}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
