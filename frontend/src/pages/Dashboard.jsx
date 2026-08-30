import { Link } from "react-router-dom";

function Dashboard() {
  let user = null;

  try {
    const userData = localStorage.getItem("user");

    if (userData) {
      user = JSON.parse(userData);
    }
  } catch {
    user = null;
  }

  return (
    <div className="page-container">

      <section className="dashboard-header">
        <h1>
          Welcome, {user?.name || "User"} 👋
        </h1>

        <p>
          Welcome to your Smart Library Portal dashboard.
        </p>
      </section>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>📚 Resources</h2>

          <p>
            Browse all available books and library
            resources.
          </p>

          <Link
            to="/resources"
            className="primary-btn"
          >
            View Resources
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>📝 Borrow Requests</h2>

          <p>
            Submit a borrow request and track its
            approval status.
          </p>

          <Link
            to="/borrow-requests"
            className="primary-btn"
          >
            My Requests
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>👤 Profile</h2>

          <p>
            View your account and personal details.
          </p>

          <Link
            to="/profile"
            className="primary-btn"
          >
            View Profile
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;