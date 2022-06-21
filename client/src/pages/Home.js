import Nav from "../components/Nav";
import { useState } from "react";
import RegisterModal from "../components/RegisterModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const authToken = false;
  const handleClick = () => {
    setShowModal(true);
    setIsSignedUp(false);
  };
  return (
    <div className="overlay">
      <Nav
        showModal={showModal}
        setShowModal={setShowModal}
        minimal={false}
        isSignedUp={isSignedUp}
        setIsSignedUp={setIsSignedUp}
      />
      <div className="home">
        <h1 className="primary-title">Soul Mate</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>
        {showModal && (
          <RegisterModal setShowModal={setShowModal} isSignedUp={isSignedUp} />
        )}
      </div>
    </div>
  );
};

export default Home;
