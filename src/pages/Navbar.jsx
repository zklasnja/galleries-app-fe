import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="p-3 text-bg-dark">
      <div className="container-header">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link className="nav-link px-2 text-white" to="/">
                Home
              </Link>
            </li>
            {user.token && (
              <li>
                <Link className="nav-link px-2 text-white" to="/create">
                  Create New Gallery
                </Link>
              </li>
            )}
            {user.token && (
              <li>
                <Link className="nav-link px-2 text-white" to="/my-galleries">
                  My Galleries
                </Link>
              </li>
            )}
          </ul>

          <div className="text-end">
            {!user.token && (
              <Link
                type="button"
                className="btn btn-outline-light me-2"
                to="/login"
              >
                Login
              </Link>
            )}
            {!user.token && (
              <Link type="button" className="btn btn-warning" to="/register">
                Register
              </Link>
            )}
            {user.token && (
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => logout()}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
