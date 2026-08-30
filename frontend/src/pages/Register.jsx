import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const departments = [
  "MBA",
  "Civil",
  "ECE",
  "Mechanical",
  "Diploma",
  "AI",
  "EEE",
  "MCA"
];

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    regNo: "",
    idNumber: "",
    phone: "+91",
    password: "",
    confirmPassword: "",
    role: "student",
    department: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Send only the fields required by the backend
      const response = await api.post("/auth/register", {
        name: form.name,
        regNo: form.regNo,
        idNumber: form.idNumber,
        phone: form.phone,
        password: form.password,
        department: form.department,
        role: form.role
      });

      setMessage(
        response.data.message ||
        "Registration successful"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <form
        className="auth-card register-card"
        onSubmit={handleRegister}
      >

        <h2>Create Account</h2>

        <p>
          Register for the Smart Library Portal
        </p>

        {message && (
          <div className="info-message">
            {message}
          </div>
        )}

        <label>Full Name</label>

        <input
          value={form.name}
          onChange={(e) =>
            updateField("name", e.target.value)
          }
          required
        />

        <label>Register Number</label>

        <input
          value={form.regNo}
          onChange={(e) =>
            updateField("regNo", e.target.value)
          }
          required
        />

        <label>College ID Number</label>

        <input
          value={form.idNumber}
          onChange={(e) =>
            updateField("idNumber", e.target.value)
          }
          required
        />

        <label>User Type</label>

        <select
          value={form.role}
          onChange={(e) =>
            updateField("role", e.target.value)
          }
        >
          <option value="student">
            Student
          </option>

          <option value="staff">
            Staff
          </option>
        </select>

        <label>Department</label>

        <select
          value={form.department}
          onChange={(e) =>
            updateField("department", e.target.value)
          }
          required
        >
          <option value="">
            Select Department
          </option>

          {departments.map((department) => (
            <option
              key={department}
              value={department}
            >
              {department}
            </option>
          ))}
        </select>

        <label>Phone Number</label>

        <input
          value={form.phone}
          onChange={(e) =>
            updateField("phone", e.target.value)
          }
          required
        />

        <label>Password</label>

        <input
          type="password"
          value={form.password}
          onChange={(e) =>
            updateField("password", e.target.value)
          }
          required
        />

        <label>Confirm Password</label>

        <input
          type="password"
          value={form.confirmPassword}
          onChange={(e) =>
            updateField(
              "confirmPassword",
              e.target.value
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
            ? "Please wait..."
            : "Complete Registration"}
        </button>

        <p className="auth-footer">
          Already registered?{" "}

          <Link to="/login">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}