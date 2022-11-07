import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../images/placeholder.webp";
import api from "../api/api";
import Loader from "../components/Loader";

const Dash = () => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [swipes, setSwipes] = useState(null);
  const [emptySwipes, setEmptySwipes] = useState(false);
  const [lastDirection, setLastDirection] = useState();

  const userId = cookies.UserId;

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
      const filteredSwipes = response.data.filter(
        (swipes) => !matchedUsers.includes(swipes.user_id)
      );

      setSwipes(filteredSwipes);
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

  const matchedUsers = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

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
                        <div className="card">
                          <LazyLoadImage
                            className="card-img"
                            src={swipe.url}
                            height="400px"
                            width="100%"
                            placeholderSrc={placeholder}
                          />
                        </div>
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
