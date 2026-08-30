import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
      totalBooks: 0,
          totalStudents: 0,
              borrowedBooks: 0,
                  pendingRequests: 0
                    });

                      const [loading, setLoading] = useState(true);

                        useEffect(() => {
                            async function fetchStats() {
                                  try {
                                          const response = await api.get("/admin/stats");

                                                  setStats(response.data.stats || stats);
                                                        } catch (error) {
                                                                console.error("Unable to load admin statistics:", error);
                                                                      } finally {
                                                                              setLoading(false);
                                                                                    }
                                                                                        }

                                                                                            fetchStats();
                                                                                              }, []);

                                                                                                return (
                                                                                                    <div className="page-container">

                                                                                                          <h1 className="page-title">
                                                                                                                  Librarian Dashboard
                                                                                                                        </h1>

                                                                                                                              {loading ? (
                                                                                                                                      <p>Loading dashboard...</p>
                                                                                                                                            ) : (
                                                                                                                                                    <div className="dashboard-grid">

                                                                                                                                                              <div className="dashboard-card">
                                                                                                                                                                          📚
                                                                                                                                                                                      <h3>{stats.totalBooks}</h3>
                                                                                                                                                                                                  <p>Total Books</p>
                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                      <div className="dashboard-card">
                                                                                                                                                                                                                                  👨‍🎓
                                                                                                                                                                                                                                              <h3>{stats.totalStudents}</h3>
                                                                                                                                                                                                                                                          <p>Registered Students</p>
                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                              <div className="dashboard-card">
                                                                                                                                                                                                                                                                                          📖
                                                                                                                                                                                                                                                                                                      <h3>{stats.borrowedBooks}</h3>
                                                                                                                                                                                                                                                                                                                  <p>Currently Borrowed</p>
                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                      <div className="dashboard-card">
                                                                                                                                                                                                                                                                                                                                                  🙋
                                                                                                                                                                                                                                                                                                                                                              <h3>{stats.pendingRequests}</h3>
                                                                                                                                                                                                                                                                                                                                                                          <p>Pending Requests</p>
                                                                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                  )}

                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                        }