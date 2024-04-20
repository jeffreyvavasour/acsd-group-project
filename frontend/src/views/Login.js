import { useState } from "react";
import axios from "axios";
import { Navigate, Routes, Route } from "react-router-dom";

function Login(props) {
  // state to hold message for initial welcome or for an error message if present
  const [message, setMessage] = useState("Please login now");
  // state to hold a username
  const [username, setUsername] = useState("");
  // state to hold a password
  const [password, setPassword] = useState("");

  // set username state
  function handleUsernameInput(e) {
    e.preventDefault();
    setUsername(e.target.value);
  }

  // set password state
  function handlePasswordInput(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  // post data to backend /users/login
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      var outgoingData = await axios.post("http://localhost:8080/users/login", {
        username: username,
        password: password,
      });
      // sets local storage item of token
      localStorage.setItem("token", outgoingData.data.token);
      // sets local storage item of username
      localStorage.setItem("username", username);
      // set 'props' loggenIn variable to true
      props.setLoggedIn(true);
    } catch (error) {
      if (error.response.status === 400) {
        // catch error from backend with 400 status
        setMessage(error.response.data.message);
      } else {
        // respond with general error message if not working
        setMessage("Error, please try again later!");
      }
    }
  }

  if (props.loggedIn) {
    return (
      // re-route to /user if user is already logged in
      <Routes>
        <Route path="*" element={<Navigate to={"/user"} />} />
      </Routes>
    );
  } else {
    return (
      // return a form for user input if user is not logged in
      <div className="form">
        <h4>{message}</h4>
        <div className="username">
          <h5>Username</h5>
          <input value={username} onChange={handleUsernameInput}></input>
        </div>
        <div className="password">
          <h5>Password</h5>
          <input
            value={password}
            type="password"
            onChange={handlePasswordInput}
          ></input>
        </div>
        <button onClick={handleSubmit} className="btn-action">
          Log in
        </button>
      </div>
    );
  }
}

export default Login;
