import React from "react";
import { useCookies } from "react-cookie";

const Chat = ({ descendingMessages }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  console.log(descendingMessages);

  return (
    <>
      <div className="chat-display-container">
        {descendingMessages.map((message, index) => (
          <div
            key={index}
            className={`chat-profile ${
              message.id === cookies.UserId ? "user-message" : ""
            }`}
          >
            <div className="chat-message-header">
              <div className="img-container">
                <img src={message.img} alt={message.name + " profile"} />
              </div>
            </div>

            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
