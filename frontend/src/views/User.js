import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Routes, Route } from "react-router-dom";

function User(props) {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async function () {
    try {
      var token = localStorage.getItem("token");
      var incomingData = await axios.get("http://localhost:8080/users/user", {
        params: { token: token },
      });
      setUsername(incomingData.data.username);
    } catch (error) {}
  };

  if (props.loggedIn) {
    return (
      <div>
        <h3>Welcome back {username}!</h3>
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
}

export default User;
