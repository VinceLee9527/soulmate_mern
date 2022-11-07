import Nav from "../components/Nav";
import { useState } from "react";
import { useCookies } from "react-cookie";
import RegisterModal from "../components/RegisterModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const authToken = cookies.AuthToken;
  const handleClick = () => {
    setShowModal(true);
    setIsSignedUp(false);

    if (authToken) {
      removeCookie("UserId", cookies.UserId);
      removeCookie("AuthToken", cookies.AuthToken);
      window.location.reload();
      return;
    }
  };
  return (
    <div className="overlay">
      <Nav
        showModal={showModal}
        setShowModal={setShowModal}
        isSignedUp={isSignedUp}
        setIsSignedUp={setIsSignedUp}
        authToken={authToken}
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
