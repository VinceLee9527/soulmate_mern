import logo from "../images/logo-white.png";
import loginLogo from "../images/login-icon.svg";

const Nav = ({ authToken, setShowModal, showModal, setIsSignedUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignedUp(true);
  };
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={logo} />
      </div>
      {!authToken && (
        <div className="login-container">
          <img className="log-logo" src={loginLogo} />
          <button
            className="nav-button"
            onClick={handleClick}
            disabled={showModal}
          >
            Log In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
