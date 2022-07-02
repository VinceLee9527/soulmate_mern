import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";

const Dash = () => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);
  const characters = [
    {
      name: "Richard Hendricks",
      url: "https://imgur.com/Q9WPlWA.jpg",
    },
    {
      name: "Erlich Bachman",
    },
    {
      name: "Monica Hall",
    },
    {
      name: "Jared Dunn",
    },
    {
      name: "Dinesh Chugtai",
    },
  ];
  const [lastDirection, setLastDirection] = useState();
  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };
  return (
    <>
      {user && (
        <div className="dash">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {characters.map((character) => (
                <TinderCard
                  className="swipe"
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name)}
                  onCardLeftScreen={() => outOfFrame(character.name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + character.url + ")" }}
                    className="card"
                  >
                    <h3>{character.name}</h3>
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
