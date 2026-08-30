import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/admin-requests"
      );

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

  const updateRequest = async (
    requestId,
    status
  ) => {
    try {
      const response = await api.post(
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

  return (
    <div className="page-container">

      <h1>👨‍💼 Admin Dashboard</h1>

      <p>
        Manage all borrow requests from students
        and teachers.
      </p>

      {message && (
        <div className="info-message">
          {message}
        </div>
      )}

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

              <h2>
                {request.resourceTitle ||
                  "Library Resource"}
              </h2>

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

              {request.status === "pending" && (
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

    </div>
  );
}

export default AdminDashboard;