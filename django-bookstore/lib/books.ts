"use server"

// Mock book database
const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publisher: "Scribner",
    description:
      "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    price: 12.99,
    coverImage: "/placeholder.svg?height=400&width=300&text=Gatsby",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publisher: "J. B. Lippincott & Co.",
    description:
      "The story takes place during three years of the Great Depression in the fictional town of Maycomb, Alabama. It focuses on six-year-old Scout Finch, who lives with her older brother Jem and their widowed father Atticus, a middle-aged lawyer.",
    price: 14.99,
    coverImage: "/placeholder.svg?height=400&width=300&text=Mockingbird",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    publisher: "Secker & Warburg",
    description:
      "The novel is set in Airstrip One, formerly Great Britain, a province of the superstate Oceania, whose residents are victims of perpetual war, omnipresent government surveillance and public manipulation.",
    price: 11.99,
    coverImage: "/placeholder.svg?height=400&width=300&text=1984",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    publisher: "T. Egerton, Whitehall",
    description:
      "The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
    price: 9.99,
    coverImage: "/placeholder.svg?height=400&width=300&text=Pride",
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    publisher: "George Allen & Unwin",
    description:
      "The story is about the hobbit Bilbo Baggins, who is hired by the wizard Gandalf as a burglar to help a group of dwarves led by Thorin Oakenshield to reclaim the Lonely Mountain from the dragon Smaug.",
    price: 15.99,
    coverImage: "/placeholder.svg?height=400&width=300&text=Hobbit",
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publisher: "Little, Brown and Company",
    description:
      'The novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school. Confused and disillusioned, Holden searches for truth and rails against the "phoniness" of the adult world.',
    price: 13.99,
    coverImage: "/placeholder.svg?height=400&width=300&text=Catcher",
  },
  {
    id: "7",
    title: "Lord of the Flies",
    author: "William Golding",
    publisher: "Faber and Faber",
    description:
      "The book focuses on a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves. The novel examines the breakdown of civilisation in the absence of adult supervision.",
    price: 10.99,
    coverImage: "/placeholder.svg?height=400&width=300&text=Flies",
  },
  {
    id: "8",
    title: "The Alchemist",
    author: "Paulo Coelho",
    publisher: "HarperOne",
    description:
      "The Alchemist follows the journey of an Andalusian shepherd boy named Santiago. Believing a recurring dream to be prophetic, he asks a Gypsy fortune teller in the nearby town about its meaning.",
    price: 16.99,
    coverImage: "/placeholder.svg?height=400&width=300&text=Alchemist",
  },
]

export async function getBooks() {
  // In a real app, you would fetch from a database
  return books
}

export async function getBookById(id: string) {
  // In a real app, you would fetch from a database
  return books.find((book) => book.id === id)
}
