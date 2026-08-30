import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  let user = null;

  try {
    const userData =
      localStorage.getItem("user");

    if (userData) {
      user = JSON.parse(userData);
    }
  } catch {
    user = null;
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  if (!user) {
    return (
      <div className="page-container">
        <p>User information is unavailable.</p>
      </div>
    );
  }

  return (
    <div className="page-container">

      <h1>👤 My Profile</h1>

      <div className="profile-card">

        <div className="profile-row">
          <strong>Name:</strong>
          <span>{user.name}</span>
        </div>

        <div className="profile-row">
          <strong>Register Number:</strong>
          <span>
            {user.registerNumber || "N/A"}
          </span>
        </div>

        <div className="profile-row">
          <strong>ID Number:</strong>
          <span>
            {user.idNumber || "N/A"}
          </span>
        </div>

        <div className="profile-row">
          <strong>Department:</strong>
          <span>
            {user.department || "N/A"}
          </span>
        </div>

        <div className="profile-row">
          <strong>Role:</strong>
          <span>
            {user.role}
          </span>
        </div>

        <button
          type="button"
          className="logout-button profile-logout"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;