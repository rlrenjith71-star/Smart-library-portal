import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [registerNumber, setRegisterNumber] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await api.post(
        "/login",
        {
          registerNumber,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (
        response.data.user.role === "admin"
      ) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        <h2>Login</h2>

        <p>
          Access your Smart Library account
        </p>

        {message && (
          <div className="info-message">
            {message}
          </div>
        )}

        <label>Register Number / Admin ID</label>

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

export default Login;