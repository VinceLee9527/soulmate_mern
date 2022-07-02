import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="match-profile">
        <div className="img-container">
          <img src={user.url} />
        </div>
        <h3 className="username">{user.firstName}</h3>
      </div>
      <i className="logout-icon" onClick={logout}>
        ⇦
      </i>
    </div>
  );
};

export default ChatHeader;
