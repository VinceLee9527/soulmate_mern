import React, { useState } from "react";
import sendIcon from "../images/send-icon.svg";
import api from "../api/api";

const ChatInput = ({ user, clickedUser, getSentMessages, getRecMessages }) => {
  const [textArea, setTextArea] = useState(null);

  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_user_id: userId,
      to_user_id: clickedUserId,
      message: textArea,
    };

    try {
      await api.post("./messages", { message });
      getSentMessages();
      getRecMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />

      <img className="chat-submit" src={sendIcon} onClick={addMessage} />
    </div>
  );
};

export default ChatInput;
