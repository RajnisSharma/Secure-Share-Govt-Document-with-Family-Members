import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, SignUp, Homepage, UploadDoc, Profile } from "./pages";
import "./App.css";

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.getItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<SignUp />} />

        {token ? (
          <>
            <Route path="/upload" element={<UploadDoc />} />
            <Route path="/homepage" element={<Homepage token={token} />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          ""
        )}
      </Routes>
    </Router>
  );
}

export default App;
