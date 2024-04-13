import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Register from "./views/Register";
import User from "./views/User";
import Recipes from "./views/Recipes";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getTokenStatus();
  }, []);

  const getTokenStatus = async function () {
    try {
      var token = localStorage.getItem("token");
      if (token) {
        var incomingData = await axios.get("http://localhost:8080/users/user", {
          params: { token: token },
        });
        if (incomingData.status === 200) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    } catch (error) {}
  };

  return (
    <Router>
      <div>
        <Navbar loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="login/*"
            element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="logout/*"
            element={<Logout setLoggedIn={setLoggedIn} />}
          />
          <Route path="register/*" element={<Register loggedIn={loggedIn} />} />
          <Route path="user/*" element={<User loggedIn={loggedIn} />} />
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
