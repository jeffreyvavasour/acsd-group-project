import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  // State to track logged in status
  const [loggedIn, setLoggedIn] = useState(false);

  // Keeps track of loggedIn variable in the 'props' object
  // calls funciton when state changes
  useEffect(() => {
    setLoggedInStatus();
  }, [props.loggedIn]);

  // Checks if user is logged in through the 'props' object
  // sets logged in status to true if user is logged in and vice versa
  const setLoggedInStatus = function () {
    if (props.loggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  // Returns nav with Home, User, Recipes and Logout links if user is logged in
  if (loggedIn) {
    return (
      <div id="nav">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand font-alt">
              YummyMoney
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/user"
                    className="nav-link active"
                    aria-current="page"
                  >
                    User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/recipes"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Recipes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/logout"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  } else {
    // returns nav with Home, Register and Login links if user is not logged in
    return (
      <div id="nav">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand font-alt">
              YummyMoney
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
