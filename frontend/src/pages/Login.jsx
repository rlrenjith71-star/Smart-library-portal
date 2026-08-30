import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [registerNumber, setRegisterNumber] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post(
        "/auth/login",
        {
          registerNumber,
          password
        }
      );

      const data = response.data;

      if (!data.success) {
        setMessage(
          data.message || "Login failed"
        );
        return;
      }

      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );
      }

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      setMessage("Login successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Invalid Register Number or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleLogin}
      >
        <h2>Welcome Back</h2>

        <p>
          Login to Smart Library Portal
        </p>

        {message && (
          <div className="info-message">
            {message}
          </div>
        )}

        <label>Register Number</label>

        <input
          type="text"
          value={registerNumber}
          onChange={(event) =>
            setRegisterNumber(
              event.target.value
            )
          }
          required
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value
            )
          }
          required
        />

        <button
          type="submit"
          className="primary-btn full-btn"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="auth-footer">
          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}