import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  let user = null;

  try {
    const userData = localStorage.getItem("user");

    if (userData) {
      user = JSON.parse(userData);
    }
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);

    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >
          📚 Smart Library
        </Link>

        <button
          type="button"
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <nav
          className={
            menuOpen
              ? "nav-links active"
              : "nav-links"
          }
        >

          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>

          {!token && (
            <>
              <Link
                to="/register"
                onClick={closeMenu}
              >
                Register
              </Link>

              <Link
                to="/login"
                onClick={closeMenu}
              >
                Login
              </Link>
            </>
          )}

          {token && user && (
            <>
              <Link
                to="/dashboard"
                onClick={closeMenu}
              >
                Dashboard
              </Link>

              <Link
                to="/resources"
                onClick={closeMenu}
              >
                Resources
              </Link>

              {user.role !== "admin" && (
                <Link
                  to="/borrow-requests"
                  onClick={closeMenu}
                >
                  My Requests
                </Link>
              )}

              {user.role === admin && (
  <Link
    to="/admin"
    onClick={closeMenu}
  >
    Admin Panel
  </Link>
)}

<Link
  to="/profile"
  onClick={closeMenu}
>
  Profile
</Link>

<button
  type="button"
  className="logout-button"
  onClick={logout}
>
  Logout
</button>
  </>
)}

</nav>

</div>

</header>
);
}

export default Navbar;