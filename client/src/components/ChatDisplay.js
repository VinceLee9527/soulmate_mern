import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import api from "../api/api";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [sentMessages, setSentMessages] = useState(null);
  const [recMessages, setRecMessages] = useState(null);

  const getSentMessages = async () => {
    try {
      const response = await api.get("/messages", {
        params: { userId: userId, otherUserId: clickedUserId },
      });
      setSentMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecMessages = async () => {
    try {
      const response = await api.get("/messages", {
        params: { userId: clickedUserId, otherUserId: userId },
      });
      setRecMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSentMessages();
    getRecMessages();
  }, []);

  const messages = [];

  sentMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["id"] = user?.user_id;
    formattedMessage["name"] = user?.firstName;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  recMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["id"] = clickedUser?.user_id;
    formattedMessage["name"] = clickedUser?.firstName;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  const descendingMessages = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  return (
    <>
      <Chat descendingMessages={descendingMessages} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getSentMessages={getSentMessages}
        getRecMessages={getRecMessages}
      />
    </>
  );
};

export default ChatDisplay;
