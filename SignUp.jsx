import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    rEmail: "",
    rPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { fName, lName, rEmail, rPassword } = formData;
    if (!fName || !lName || !rEmail || !rPassword) {
      alert("Error: All fields are required for Sign-Up.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: rEmail,
        password: rPassword,
      });

      if (error) throw error;

      alert("Sign-Up successful! Please check your email for verification.");

      setFormData({ fName: "", lName: "", rEmail: "", rPassword: "" });
    } catch (err) {
      alert(`Error: ${err.message || "Sign-Up failed."}`);
    }
  };

  return (
    <div className="App">
      <div className="container" id="signup">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <h1 className="form-title">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser />
            <input
              type="text"
              name="fName"
              placeholder="First Name"
              value={formData.fName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaUser />
            <input
              type="text"
              name="lName"
              placeholder="Last Name"
              value={formData.lName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              name="rEmail"
              placeholder="Email"
              value={formData.rEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaLock />
            <input
              type="password"
              name="rPassword"
              placeholder="Password"
              value={formData.rPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn" type="submit">
            Sign Up
          </button>
        </form>
        <div className="links">
          <p>Already have an account?</p>
          <Link to="/">
            <button>Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
