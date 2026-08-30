import { useEffect, useState } from "react";
import api from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/books");

      setBooks(response.data.books || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to load books."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase();

    return (
      book.title
        ?.toLowerCase()
        .includes(searchText) ||
      book.author
        ?.toLowerCase()
        .includes(searchText) ||
      book.category
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <div className="page-container">

      <h1>📖 Library Books</h1>

      <p>
        Browse all books available in the library.
      </p>

      <input
        className="search-input"
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      {message && (
        <div className="info-message">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="resource-grid">

          {filteredBooks.length === 0 && (
            <p>No books found.</p>
          )}

          {filteredBooks.map((book) => (
            <div
              className="resource-card"
              key={book._id}
            >
              <h2>{book.title}</h2>

              <p>
                <strong>Author:</strong>{" "}
                {book.author}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {book.category}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {book.quantity || 0}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {book.available
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Books;