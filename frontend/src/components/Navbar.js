import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedInStatus();
  }, [props.loggedIn]);

  const setLoggedInStatus = function () {
    if (props.loggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  if (loggedIn) {
    return (
      <nav>
        <Link to="/">Home</Link> |&nbsp;
        <Link to="/user">User</Link> |&nbsp;
        <Link to="/recipes">Recipes</Link> |&nbsp;
        <Link to="/logout">Logout</Link>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to="/">Home</Link> |&nbsp;
        <Link to="/register">Register</Link> |&nbsp;
        <Link to="/login">Login</Link>
      </nav>
    );
  }
}

export default Navbar;
