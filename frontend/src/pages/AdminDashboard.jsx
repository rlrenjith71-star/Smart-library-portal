import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [books, setBooks] = useState([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    category: "",
    quantity: 1
  });

  useEffect(() => {
    loadRequests();
    loadBooks();
  }, []);

  const loadRequests = async () => {
    try {
      const response =
        await api.get("/admin-requests");

      setRequests(
        response.data.requests || []
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to load requests."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadBooks = async () => {
    try {
      const response =
        await api.get("/books");

      setBooks(response.data.books || []);
    } catch {
      // Ignore temporary book loading errors.
    }
  };

  const updateRequest = async (
    requestId,
    status
  ) => {
    try {
      const response =
        await api.post(
          "/update-request",
          {
            requestId,
            status
          }
        );

      setMessage(response.data.message);

      loadRequests();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to update request."
      );
    }
  };

  const updateBookField = (
    field,
    value
  ) => {
    setBookForm({
      ...bookForm,
      [field]: value
    });
  };

  const addBook = async (event) => {
    event.preventDefault();

    try {
      const response =
        await api.post(
          "/add-book",
          bookForm
        );

      setMessage(response.data.message);

      setBookForm({
        title: "",
        author: "",
        category: "",
        quantity: 1
      });

      loadBooks();

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to add book."
      );
    }
  };

  const deleteBook = async (bookId) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this book?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await api.post(
          "/delete-book",
          {
            bookId
          }
        );

      setMessage(response.data.message);

      loadBooks();

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to delete book."
      );
    }
  };

  return (
    <div className="page-container">

      <h1>👨‍💼 Admin Dashboard</h1>

      {message && (
        <div className="info-message">
          {message}
        </div>
      )}

      <section className="admin-section">

        <h2>➕ Add New Book</h2>

        <form
          className="admin-form"
          onSubmit={addBook}
        >

          <input
            placeholder="Book Title"
            value={bookForm.title}
            onChange={(event) =>
              updateBookField(
                "title",
                event.target.value
              )
            }
            required
          />

          <input
            placeholder="Author"
            value={bookForm.author}
            onChange={(event) =>
              updateBookField(
                "author",
                event.target.value
              )
            }
            required
          />

          <input
            placeholder="Category"
            value={bookForm.category}
            onChange={(event) =>
              updateBookField(
                "category",
                event.target.value
              )
            }
            required
          />

          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={bookForm.quantity}
            onChange={(event) =>
              updateBookField(
                "quantity",
                event.target.value
              )
            }
            required
          />

          <button
            type="submit"
            className="primary-btn"
          >
            Add Book
          </button>

        </form>

      </section>

      <section className="admin-section">

        <h2>📚 Manage Books</h2>

        <div className="resource-grid">

          {books.map((book) => (
            <div
              className="resource-card"
              key={book._id}
            >

              <h3>{book.title}</h3>

              <p>
                {book.author}
              </p>

              <p>
                {book.category}
              </p>

              <p>
                Quantity: {book.quantity}
              </p>

              <button
                type="button"
                className="reject-btn"
                onClick={() =>
                  deleteBook(book._id)
                }
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </section>

      <section className="admin-section">

        <h2>📝 Borrow Requests</h2>

        {loading ? (
          <p>Loading requests...</p>
        ) : (
          <div className="requests-list">

            {requests.length === 0 && (
              <p>
                No borrow requests available.
              </p>
            )}

            {requests.map((request) => (
              <div
                className="request-card"
                key={request._id}
              >

                <h3>
                  {request.resourceTitle ||
                    "Library Resource"}
                </h3>

                <p>
                  <strong>User:</strong>{" "}
                  {request.userName}
                </p>

                <p>
                  <strong>Role:</strong>{" "}
                  {request.userRole}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {request.status}
                </p>

                {request.status ===
                  "pending" && (
                  <div className="admin-actions">

                    <button
                      type="button"
                      className="approve-btn"
                      onClick={() =>
                        updateRequest(
                          request._id,
                          "approved"
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      className="reject-btn"
                      onClick={() =>
                        updateRequest(
                          request._id,
                          "rejected"
                        )
                      }
                    >
                      Reject
                    </button>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default AdminDashboard;