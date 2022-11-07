import React, { useState } from "react";
import MatchesDisplay from "./MatchesDisplay";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";
import chatExtendLogo from "../images/message-circle.svg";
import api from "../api/api";

const ChatContainer = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);

  return (
    <div className="chat-section">
      <input type="checkbox" class="chat-toggle" id="chat-toggle"></input>
      <label for="chat-toggle" class="chat-toggle-label">
        <img className="show-chat-logo" src={chatExtendLogo} />
        <span>Show Chat</span>
      </label>
      <div className="chat-container">
        <ChatHeader user={user} />
        <div className="chat-option-selector">
          <button
            className={`option ${clickedUser ? "notActive" : ""}`}
            onClick={() => setClickedUser(null)}
          >
            Matches
          </button>
          <button className={`option-chat ${clickedUser ? "" : "notActive"}`}>
            Chat
          </button>
        </div>
        {!clickedUser && (
          <MatchesDisplay
            matches={user.matches}
            setClickedUser={setClickedUser}
          />
        )}
        {clickedUser && <ChatDisplay clickedUser={clickedUser} user={user} />}
      </div>
    </div>
  );
};

export default ChatContainer;
