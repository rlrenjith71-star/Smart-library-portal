import { Link } from "react-router-dom";

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

                export default function Departments() {
                  return (
                      <div className="page-container">

                            <h1 className="page-title">
                                    Departments
                                          </h1>

                                                <div className="department-grid">

                                                        {departments.map((department) => (

                                                                  <Link
                                                                              key={department}
                                                                                          to={`/resources?department=${department}`}
                                                                                                      className="department-card"
                                                                                                                >
                                                                                                                            🏛️
                                                                                                                                        <br /><br />
                                                                                                                                                    {department}
                                                                                                                                                              </Link>

                                                                                                                                                                      ))}

                                                                                                                                                                            </div>

                                                                                                                                                                                </div>
                                                                                                                                                                                  );
                                                                                                                                                                                  }