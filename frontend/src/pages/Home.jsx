import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <section className="hero">

        <div className="hero-content">
          <h1>
            Welcome to Smart Library Portal
          </h1>

          <p>
            A simple and efficient platform for students,
            teachers, and administrators to manage library
            resources and borrowing requests.
          </p>

          <div className="hero-buttons">
            <Link
              to="/register"
              className="primary-btn"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="secondary-btn"
            >
              Login
            </Link>
          </div>
        </div>

      </section>

      <section className="features">

        <h2>What You Can Do</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>📚 Browse Resources</h3>

            <p>
              Search and explore available library books
              and resources easily.
            </p>
          </div>

          <div className="feature-card">
            <h3>📝 Borrow Requests</h3>

            <p>
              Students and teachers can submit requests
              to borrow library resources.
            </p>
          </div>

          <div className="feature-card">
            <h3>👨‍💼 Admin Management</h3>

            <p>
              Administrators can manage resources and
              approve or reject borrow requests.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;