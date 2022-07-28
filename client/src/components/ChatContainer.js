import React, { useState } from "react";
import MatchesDisplay from "./MatchesDisplay";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";

const ChatContainer = ({ user }) => {
  const [showChat, setShowChat] = useState(false);
  const [clickedUser, setClickedUser] = useState(null);

  return (
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
  );
};

export default ChatContainer;
