import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
    const navigate = useNavigate();

      const handleLogout = () => {
          logout();
              navigate("/login");
                };

                  return (
                      <nav className="navbar">
                            <Link to="/" className="logo">
                                    <BookOpen size={28} />
                                            <span>Smart Library</span>
                                                  </Link>

                                                        <div className="nav-links">
                                                                {user ? (
                                                                          <>
                                                                                      <Link to="/dashboard" className="nav-user">
                                                                                                    <User size={18} />
                                                                                                                  {user.name}
                                                                                                                              </Link>

                                                                                                                                          <button
                                                                                                                                                        onClick={handleLogout}
                                                                                                                                                                      className="logout-btn"
                                                                                                                                                                                  >
                                                                                                                                                                                                <LogOut size={18} />
                                                                                                                                                                                                              Logout
                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                    </>
                                                                                                                                                                                                                                            ) : (
                                                                                                                                                                                                                                                      <>
                                                                                                                                                                                                                                                                  <Link to="/login">Login</Link>

                                                                                                                                                                                                                                                                              <Link
                                                                                                                                                                                                                                                                                            to="/register"
                                                                                                                                                                                                                                                                                                          className="register-nav"
                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                                    Register
                                                                                                                                                                                                                                                                                                                                                </Link>
                                                                                                                                                                                                                                                                                                                                                          </>
                                                                                                                                                                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                            </nav>
                                                                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                                                                              }