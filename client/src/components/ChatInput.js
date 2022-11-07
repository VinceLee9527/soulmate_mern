import React, { useEffect, useState } from "react";
import sendIcon from "../images/send-icon.svg";
import api from "../api/api";
import io from "socket.io-client";

const ChatInput = ({ user, clickedUser, getSentMessages, getRecMessages }) => {
  const [textArea, setTextArea] = useState("");
  const socket = io("http://localhost:8000");

  // socket.on("connect", (socket) => {
  //   console.log(socket.id);
  // });
  const sendMessage = () => {
    socket.emit("send_message", { message: "hello" });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

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

  const handleKeypress = (e) => {
    e.preventDefault();
    if (e.keyCode === 13 && !e.ctrlKey) {
      addMessage();
    }
  };

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        onKeyUp={handleKeypress}
      />

      <img className="chat-submit" src={sendIcon} onClick={sendMessage} />
    </div>
  );
};

export default ChatInput;

//
