import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import loginLogo from "../images/login-icon.svg";
import editLogo from "../images/cog-outline.svg";

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="header-container">
      <div className="match-profile">
        <div className="img-container">
          <img src={user.url} />
        </div>
        <h3 className="username">{user.firstName}</h3>
      </div>
      <div className="function-container">
        <div className="logo-container" onClick={handleProfile}>
          <img className="edit-logo" src={editLogo} />
          <p className="log-text">Edit</p>
        </div>
        <div className="logo-container" onClick={handleLogout}>
          <img className="log-logo" src={loginLogo} />
          <p className="log-text">Log Out</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
