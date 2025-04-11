import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { getCartWithItems } from "@/lib/cart"
import RemoveFromCartButton from "@/components/remove-from-cart-button"

export default async function Cart() {
  const session = await getSession()

  // If not logged in, redirect to login page
  if (!session.isLoggedIn) {
    redirect("/login")
  }

  const cart = await getCartWithItems()
  const totalPrice = cart.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to Books
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.items.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link href="/" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-16 w-12 flex-shrink-0">
                        <Image
                          src={item.book.coverImage || "/placeholder.svg?height=64&width=48"}
                          alt={item.book.title}
                          width={48}
                          height={64}
                          className="h-16 w-12 object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <Link
                          href={`/books/${item.book.id}`}
                          className="text-sm font-medium text-gray-900 hover:underline"
                        >
                          {item.book.title}
                        </Link>
                        <div className="text-sm text-gray-500">{item.book.author}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.book.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(item.book.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <RemoveFromCartButton itemId={item.id} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan={3} className="px-6 py-4 text-right font-medium">
                  Total:
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg font-bold">${totalPrice.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>

          <div className="px-6 py-4 bg-gray-50">
            <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
