import React from "react";
import MatchesDisplay from "./MatchesDisplay";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";

const ChatContainer = ({ user }) => {
  return (
    <div className="chat-container">
      <ChatHeader user={user} />
      <div className="chat-option-selector">
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>
      <MatchesDisplay />
      <ChatDisplay />
    </div>
  );
};

export default ChatContainer;
