import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dash from "./pages/Dash";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
// import io from "socket.io-client";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // const socket = io.connect("http://localhost:8000");

  const authToken = cookies.AuthToken;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/profile" element={<Profile />} />}
        {authToken && <Route path="/dashboard" element={<Dash />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
