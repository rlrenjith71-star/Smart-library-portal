import { useEffect, useState } from "react";
import api from "../services/api";

function Resources() {
  const [resources, setResources] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/resources");

      setResources(
        response.data.resources || []
      );

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to load resources."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredResources =
    resources.filter((resource) => {
      const searchText =
        search.toLowerCase();

      return (
        resource.title
          ?.toLowerCase()
          .includes(searchText) ||

        resource.author
          ?.toLowerCase()
          .includes(searchText) ||

        resource.category
          ?.toLowerCase()
          .includes(searchText)
      );
    });

  return (
    <div className="page-container">

      <h1>📚 Library Resources</h1>

      <p>
        Browse and search available library resources.
      </p>

      <input
        className="search-input"
        type="text"
        placeholder="Search by title, author or category"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      {message && (
        <div className="info-message">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading resources...</p>
      ) : (
        <div className="resource-grid">

          {filteredResources.length === 0 && (
            <p>
              No resources found.
            </p>
          )}

          {filteredResources.map(
            (resource) => (
              <div
                className="resource-card"
                key={resource._id}
              >

                <h2>
                  {resource.title}
                </h2>

                <p>
                  <strong>Author:</strong>{" "}
                  {resource.author || "Not available"}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {resource.category || "General"}
                </p>

                <p>
                  <strong>Available:</strong>{" "}
                  {resource.available
                    ? "Yes"
                    : "No"}
                </p>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default Resources;