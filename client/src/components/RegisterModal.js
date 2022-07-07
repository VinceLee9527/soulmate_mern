import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const RegisterModal = ({ setShowModal, isSignedUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isSignedUp && password !== confirmPassword) {
        setError("Please ensure both passwords are identical");
        return;
      }
      const response = await axios.post(
        `http://localhost:8000/${isSignedUp ? "login" : "signup"}`,
        {
          email,
          password,
        }
      );

      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);
      const success = response.status === 201;

      if (success && !isSignedUp) navigate("/profile");
      if (success && isSignedUp) navigate("/dashboard");

      window.location.reload();
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="regis-modal">
      <div className="close-icon" onClick={handleClick}>
        x
      </div>
      <h2>{isSignedUp ? "Log In" : "Create Account"}</h2>

      <p className="privacy-text">
        By clicking sign up you are agreeing to the terms of use and
        acknowledging the Privacy Policy.
      </p>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isSignedUp && (
          <input
            className="form-input"
            type="password"
            id="password-check"
            name="password-check"
            placeholder="Confirm your password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="second-button" type="submit" placeholder="Submit" />
      </form>
    </div>
  );
};

export default RegisterModal;
