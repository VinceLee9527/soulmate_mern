import React, { useState } from "react";
import sendIcon from "../images/send-icon.svg";

const ChatInput = () => {
  const [textArea, setTextArea] = useState(null);
  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />

      <img className="chat-submit" src={sendIcon} />
    </div>
  );
};

export default ChatInput;
