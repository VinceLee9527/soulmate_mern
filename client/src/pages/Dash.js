import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import api from "../api/api";
import io from "socket.io-client";
import Loader from "../components/Loader";

const Dash = () => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [swipes, setSwipes] = useState(null);
  const [emptySwipes, setEmptySwipes] = useState(false);
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
    } catch (error) {
      console.log(error);
    }
  };

  const getSwipes = async () => {
    try {
      const response = await api.get("/swipes", {
        params: { instrumentInterest: user?.instrumentInterest },
      });
      console.log(matchedUsers);
      const filteredSwipes = response.data.filter(
        (swipes) => !matchedUsers.includes(swipes.user_id)
      );

      setSwipes(filteredSwipes);
      console.log(filteredSwipes.length);
      if (filteredSwipes.length === 0) {
        setEmptySwipes(true);
      }
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

  // useEffect(() => {
  //   if (!swipes) {
  //     setEmpty();
  //   }
  // }, [swipes]);

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
      if (swipes.length === 0) {
        setEmptySwipes(true);
      }
    }
    setLastDirection(direction);
  };

  const setEmpty = () => {
    setEmptySwipes(true);
  };

  const matchedUsers = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  // console.log(swipes.length);

  return (
    <>
      {user ? (
        <div className="dash-container">
          <div className="dash">
            <ChatContainer user={user} />
            <div className="swipe-container">
              <div className="card-container">
                {!emptySwipes
                  ? swipes?.map((swipe) => (
                      <TinderCard
                        className="swipe"
                        key={swipe.user_id}
                        onSwipe={(dir) => swiped(dir, swipe.user_id)}
                      >
                        <div
                          style={{ backgroundImage: "url(" + swipe.url + ")" }}
                          className="card"
                        ></div>
                        <div className="info">
                          <h3>{swipe.firstName}</h3>
                          <div>
                            <span className="ins-played">
                              {swipe.instrumentPlayed}{" "}
                            </span>
                            <span>
                              looking for {swipe.instrumentInterest}
                              {swipe.instrumentInterest === "everyone"
                                ? ""
                                : "s"}
                            </span>
                          </div>
                          <p>About me: {swipe.about}</p>
                        </div>
                      </TinderCard>
                    ))
                  : "There are no available matches at this time. Please come back later!"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Dash;
