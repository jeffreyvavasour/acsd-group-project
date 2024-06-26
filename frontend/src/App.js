import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Register from "./views/Register";
import User from "./views/User";
import Recipes from "./views/Recipes";
import SingleRecipe from "./views/SingleRecipe";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    getTokenStatus();
  }, []);

  // Sets logged in status to true if token is in local storage
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
      <div className="main-container">
        <div className="center-flex">
          <div className="body-container">
            <Navbar loggedIn={loggedIn} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="login/*"
                element={
                  <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                }
              />
              <Route
                path="logout/*"
                element={<Logout setLoggedIn={setLoggedIn} />}
              />
              <Route
                path="register/*"
                element={<Register loggedIn={loggedIn} />}
              />
              <Route path="user/*" element={<User loggedIn={loggedIn} />} />
              <Route
                path="/recipes"
                element={<Recipes loggedIn={loggedIn} />}
              />
              <Route
                path="/recipes/:recipeId"
                element={<SingleRecipe loggedIn={loggedIn} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
