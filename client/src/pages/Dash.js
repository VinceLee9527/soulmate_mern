import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import api from "../api/api";
import io from "socket.io-client";

const Dash = () => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [swipes, setSwipes] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  // const socket = io("http://localhost:8000");

  const userId = cookies.UserId;

  // socket.on("connect", () => {
  //   console.log(socket.id);
  //   socket.emit("addUser", user.user_id);
  //   socket.on("getUsers", (users) => {
  //     console.log(users);
  //     const setSocketId = async () => {
  //       try {
  //         const response = await api.put("/socketId", {
  //           params: { users },
  //         });
  //         setUser(response.data);
  //         console.log("usred");
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //   });
  // });

  const getUser = async () => {
    try {
      const response = await api.get("/user", {
        params: { userId },
      });
      setUser(response.data);
      console.log("usred");
    } catch (error) {
      console.log(error);
    }
  };

  const getSwipes = async () => {
    try {
      const response = await api.get("/swipes", {
        params: { instrumentInterest: user?.instrumentInterest },
      });
      setSwipes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getSwipes();
    }
  }, [user]);

  const updateMatches = async (matchedUserId) => {
    try {
      const response = await api.put("/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };
  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUsers = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredSwipes = swipes?.filter(
    (swipes) => !matchedUsers.includes(swipes.user_id)
  );

  return (
    <>
      {user && (
        <div className="dash-container">
          <div className="dash">
            <ChatContainer user={user} />
            <div className="swipe-container">
              <div className="card-container">
                {filteredSwipes?.map((swipe) => (
                  <TinderCard
                    className="swipe"
                    key={swipe.user_id}
                    onSwipe={(dir) => swiped(dir, swipe.user_id)}
                    onCardLeftScreen={() => outOfFrame(swipe.user_id)}
                  >
                    <div
                      style={{ backgroundImage: "url(" + swipe.url + ")" }}
                      className="card"
                    ></div>
                    <div className="info">
                      <h3>{swipe.firstName}</h3>
                      <p>I am a {swipe.instrumentPlayed}</p>
                      <p>I am looking for a {swipe.instrumentInterest}</p>
                      <p>About me: {swipe.about}</p>
                    </div>
                  </TinderCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dash;
