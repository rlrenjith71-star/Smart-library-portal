import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    registerNumber: "",
    idNumber: "",
    phone: "",
    department: "",
    role: "student",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const updateField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    if (
      form.password !==
      form.confirmPassword
    ) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/register",
        {
          name: form.name,
          registerNumber: form.registerNumber,
          idNumber: form.idNumber,
          phone: form.phone,
          department: form.department,
          role: form.role,
          password: form.password
        }
      );

      setMessage(
        response.data.message ||
        "Registration successful."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Registration failed."
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

        <h2>Create Account</h2>

        <p>
          Register as a Student or Teacher
        </p>

        {message && (
          <div className="info-message">
            {message}
          </div>
        )}

        <label>Full Name</label>

        <input
          type="text"
          value={form.name}
          onChange={(event) =>
            updateField(
              "name",
              event.target.value
            )
          }
          required
        />

        <label>Register Number</label>

        <input
          type="text"
          value={form.registerNumber}
          onChange={(event) =>
            updateField(
              "registerNumber",
              event.target.value
            )
          }
          required
        />

        <label>ID Number</label>

        <input
          type="text"
          value={form.idNumber}
          onChange={(event) =>
            updateField(
              "idNumber",
              event.target.value
            )
          }
          required
        />

        <label>Phone Number</label>

        <input
          type="tel"
          value={form.phone}
          onChange={(event) =>
            updateField(
              "phone",
              event.target.value
            )
          }
          required
        />

        <label>Department</label>

        <input
          type="text"
          value={form.department}
          onChange={(event) =>
            updateField(
              "department",
              event.target.value
            )
          }
          required
        />

        <label>User Type</label>

        <select
          value={form.role}
          onChange={(event) =>
            updateField(
              "role",
              event.target.value
            )
          }
        >
          <option value="student">
            Student
          </option>

          <option value="teacher">
            Teacher
          </option>
        </select>

        <label>Password</label>

        <input
          type="password"
          value={form.password}
          onChange={(event) =>
            updateField(
              "password",
              event.target.value
            )
          }
          required
        />

        <label>Confirm Password</label>

        <input
          type="password"
          value={form.confirmPassword}
          onChange={(event) =>
            updateField(
              "confirmPassword",
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
            ? "Registering..."
            : "Register"}
        </button>

        <p className="auth-footer">
          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;