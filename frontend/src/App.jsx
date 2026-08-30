import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import BorrowRequests from "./pages/BorrowRequests";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Books from "./pages/Books";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="app-container">

      <Navbar />

      <main className="main-content">
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            }
          />

          <Route
            path="/borrow-requests"
            element={
              <ProtectedRoute>
                <BorrowRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
<Route
  path="/books"
  element={
    <ProtectedRoute>
      <Books />
    </ProtectedRoute>
  }
/>
        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;