import logo from "../images/logo-white.png";
import colorLogo from "../images/logo.png";

const Nav = ({ minimal, setShowModal, showModal, setIsSignedUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignedUp(true);
  };
  const authToken = false;
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? colorLogo : logo} />
      </div>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log In
        </button>
      )}
    </nav>
  );
};

export default Nav;
