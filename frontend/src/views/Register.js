import { useState } from "react";
import axios from "axios";
import { Navigate, Routes, Route } from "react-router-dom";

function Register(props) {
  const [message, setMessage] = useState("Please register now");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameInput(e) {
    e.preventDefault();
    setUsername(e.target.value);
  }

  function handlePasswordInput(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      var outgoingData = await axios.post(
        "http://localhost:8080/users/register",
        {
          username: username,
          password: password,
        }
      );
      setMessage("You are now registered");
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error, please try again later!");
      }
    }
  }

  if (props.loggedIn) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/user" />} />
      </Routes>
    );
  } else {
    return (
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
          Register
        </button>
      </div>
    );
  }
}

export default Register;
