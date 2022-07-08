import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import api from "../api/api";

const Dash = () => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [swipes, setSwipes] = useState(null);
  const [lastDirection, setLastDirection] = useState();

  const userId = cookies.UserId;
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
                  >
                    <h3>{swipe.firstName}</h3>
                  </div>
                </TinderCard>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dash;
