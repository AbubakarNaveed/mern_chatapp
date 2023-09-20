import "./App.css";
import io from "socket.io-client";
import LogIn from "./components/logIn";
import SignUp from "./components/signUp";
import Message from "./components/Messages";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// const socket = io.connect("http://localhost:8000");
function App() {
  const loginStatus = useSelector((state) => state.user.userLogin);
  return (
    <div
      style={{
        backgroundColor: "#000",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        width: "100%",
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <Routes>
        {/* <Route path="/">
          <Redirect to="/login-in" />
        </Route> */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        {loginStatus && <Route path="/messages" element={<Message />} />}
      </Routes>
    </div>
  );
}

export default App;
