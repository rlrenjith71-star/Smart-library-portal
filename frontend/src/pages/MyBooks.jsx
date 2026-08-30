import { useEffect, useState } from "react";
import api from "../services/api";

export default function MyBooks() {
  const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

      useEffect(() => {
          async function fetchMyBooks() {
                try {
                        const response = await api.get("/borrowing/my-books");
                                setBooks(response.data.books || []);
                                      } catch (error) {
                                              console.error("Unable to load borrowed books:", error);
                                                    } finally {
                                                            setLoading(false);
                                                                  }
                                                                      }

                                                                          fetchMyBooks();
                                                                            }, []);

                                                                              function formatDate(date) {
                                                                                  if (!date) return "-";

                                                                                      return new Date(date).toLocaleDateString();
                                                                                        }

                                                                                          return (
                                                                                              <div className="page-container">
                                                                                                    <h1 className="page-title">My Borrowed Books</h1>

                                                                                                          {loading && <p>Loading your books...</p>}

                                                                                                                {!loading && books.length === 0 && (
                                                                                                                        <p>You have not borrowed any books.</p>
                                                                                                                              )}

                                                                                                                                    {!loading && books.length > 0 && (
                                                                                                                                            <div className="books-grid">
                                                                                                                                                      {books.map((book) => (
                                                                                                                                                                  <div className="book-card" key={book._id}>
                                                                                                                                                                                <h3>{book.bookTitle}</h3>

                                                                                                                                                                                              <p>
                                                                                                                                                                                                              <strong>Borrow Date:</strong>{" "}
                                                                                                                                                                                                                              {formatDate(book.borrowDate)}
                                                                                                                                                                                                                                            </p>

                                                                                                                                                                                                                                                          <p>
                                                                                                                                                                                                                                                                          <strong>Due Date:</strong>{" "}
                                                                                                                                                                                                                                                                                          {formatDate(book.dueDate)}
                                                                                                                                                                                                                                                                                                        </p>

                                                                                                                                                                                                                                                                                                                      {book.returnDate && (
                                                                                                                                                                                                                                                                                                                                      <p>
                                                                                                                                                                                                                                                                                                                                                        <strong>Returned:</strong>{" "}
                                                                                                                                                                                                                                                                                                                                                                          {formatDate(book.returnDate)}
                                                                                                                                                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                                                                                                                                                                        )}

                                                                                                                                                                                                                                                                                                                                                                                                                      <span
                                                                                                                                                                                                                                                                                                                                                                                                                                      className={`status status-${
                                                                                                                                                                                                                                                                                                                                                                                                                                                        book.calculatedStatus || book.status
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }`}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      {book.calculatedStatus || book.status}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }