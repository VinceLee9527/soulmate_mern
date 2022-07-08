import React, { useState } from "react";
import MatchesDisplay from "./MatchesDisplay";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";

const ChatContainer = ({ user }) => {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="chat-container">
      <ChatHeader user={user} />
      <div className="chat-option-selector">
        <button
          className={`option ${showChat ? "notActive" : ""}`}
          onClick={() => setShowChat(false)}
        >
          Matches
        </button>
        <button
          className={`option ${!showChat ? "notActive" : ""}`}
          onClick={() => setShowChat(true)}
        >
          Chat
        </button>
      </div>
      {!showChat && <MatchesDisplay matches={user.matches} />}
      {showChat && <ChatDisplay />}
    </div>
  );
};

export default ChatContainer;
