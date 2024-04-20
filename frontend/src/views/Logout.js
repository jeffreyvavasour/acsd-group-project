import { useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

function Logout(props) {
  useEffect(() => {
    logout();
  }, []);

  // logs user out
  const logout = function () {
    // remove token from local storage
    localStorage.removeItem("token");
    // remove username from local storage
    localStorage.removeItem("username");
    // set 'props' loggedIn state to false
    props.setLoggedIn(false);
  };

  return (
    // navigate to root when logged out
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Logout;
