import { useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

function Logout(props) {
  useEffect(() => {
    logout();
  }, []);

  const logout = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    props.setLoggedIn(false);
  };

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Logout;
