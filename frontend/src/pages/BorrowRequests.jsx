import { useEffect, useState } from "react";
import api from "../services/api";

function BorrowRequests() {
  const [resourceId, setResourceId] =
    useState("");

  const [resources, setResources] =
    useState([]);

  const [requests, setRequests] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadResources();
    loadRequests();
  }, []);

  const loadResources = async () => {
    try {
      const response =
        await api.get("/resources");

      setResources(
        response.data.resources || []
      );

    } catch {
      // Resources may be unavailable temporarily.
    }
  };

  const loadRequests = async () => {
    try {
      const response =
        await api.get("/my-requests");

      setRequests(
        response.data.requests || []
      );

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to load borrow requests."
      );
    }
  };

  const submitRequest = async (
    event
  ) => {
    event.preventDefault();

    if (!resourceId) {
      setMessage(
        "Please select a resource."
      );

      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response =
        await api.post(
          "/borrow-request",
          {
            resourceId
          }
        );

      setMessage(
        response.data.message ||
        "Borrow request submitted successfully."
      );

      setResourceId("");

      loadRequests();

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to submit borrow request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <h1>📝 Borrow Requests</h1>

      {message && (
        <div className="info-message">
          {message}
        </div>
      )}

      <section className="request-form-section">

        <h2>Request a Resource</h2>

        <form
          onSubmit={submitRequest}
          className="request-form"
        >

          <select
            value={resourceId}
            onChange={(event) =>
              setResourceId(
                event.target.value
              )
            }
            required
          >

            <option value="">
              Select Resource
            </option>

            {resources
              .filter(
                (resource) =>
                  resource.available
              )
              .map((resource) => (
                <option
                  key={resource._id}
                  value={resource._id}
                >
                  {resource.title}
                </option>
              ))}

          </select>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Send Borrow Request"}
          </button>

        </form>

      </section>

      <section className="requests-section">

        <h2>My Request History</h2>

        <div className="requests-list">

          {requests.length === 0 && (
            <p>
              You have not submitted any borrow requests.
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
                Status:{" "}

                <strong>
                  {request.status}
                </strong>
              </p>

              <p>
                Requested:{" "}

                {request.createdAt
                  ? new Date(
                      request.createdAt
                    ).toLocaleDateString()
                  : "Not available"}
              </p>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default BorrowRequests;