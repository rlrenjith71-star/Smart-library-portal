import {
    BrowserRouter,
      Routes,
        Route
        } from "react-router-dom";

        import { AuthProvider } from "./context/AuthContext";

        import Navbar from "./components/Navbar";

        import Home from "./pages/Home";
        import Login from "./pages/Login";
        import Register from "./pages/Register";
        import Dashboard from "./pages/Dashboard";
        import Departments from "./pages/Departments";
        import Books from "./pages/Books";
        import Resources from "./pages/Resources";
        import MyBooks from "./pages/MyBooks";
        import RequestBook from "./pages/RequestBook";
        import LibraryVisit from "./pages/LibraryVisit";
        import AdminDashboard from "./pages/AdminDashboard";
        import AddBook from "./pages/AddBook";
        import ManageRequests from "./pages/ManageRequests";

        export default function App() {
          return (
              <BrowserRouter>

                    <AuthProvider>

                            <Navbar />

                                    <main>
                                              <Routes>
                                                <Route
                                                  path="/admin"
                                                    element={<AdminDashboard />}
                                                    />

                                                    <Route
                                                      path="/admin/add-book"
                                                        element={<AddBook />}
                                                        />

                                                        <Route
                                                          path="/admin/requests"
                                                            element={<ManageRequests />}
                                                            />
                                              <Route
                                                path="/library-visit"
                                                  element={<LibraryVisit />}
                                                  />
                                                <Route
                                                  path="/my-books"
                                                    element={<MyBooks />}
                                                    />

                                                    <Route
                                                      path="/request-book"
                                                        element={<RequestBook />}
                                                        />
                                                <Route
                                                  path="/departments"
                                                    element={<Departments />}
                                                    />

                                                    <Route
                                                      path="/books"
                                                        element={<Books />}
                                                        />

                                                        <Route
                                                          path="/resources"
                                                            element={<Resources />}
                                                            />

                                                          <Route
                                                                        path="/"
                                                                                      element={<Home />}
                                                                                                  />

                                                                                                              <Route
                                                                                                                            path="/login"
                                                                                                                                          element={<Login />}
                                                                                                                                                      />

                                                                                                                                                                  <Route
                                                                                                                                                                                path="/register"
                                                                                                                                                                                              element={<Register />}
                                                                                                                                                                                                          />

                                                                                                                                                                                                                      <Route
                                                                                                                                                                                                                                    path="/dashboard"
                                                                                                                                                                                                                                                  element={<Dashboard />}
                                                                                                                                                                                                                                                              />

                                                                                                                                                                                                                                                                        </Routes>
                                                                                                                                                                                                                                                                                </main>

                                                                                                                                                                                                                                                                                      </AuthProvider>

                                                                                                                                                                                                                                                                                          </BrowserRouter>
                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                            }
