import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  adminOnly = false
}) {
  const token =
    localStorage.getItem("token");

  const userData =
    localStorage.getItem("user");

  if (!token || !userData) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  let user;

  try {
    user = JSON.parse(userData);
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    adminOnly &&
    user.role !== "admin"
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;