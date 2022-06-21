import TinderCard from "react-tinder-card";
import { useState } from "react";
import ChatContainer from "../components/ChatContainer";

const Dash = () => {
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
    <div className="dash">
      <ChatContainer />
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
  );
};

export default Dash;
