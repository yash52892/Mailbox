import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./Pages/Authpage";
import Home from "./Pages/Home";
import Compose from "./Pages/Compose";
import Inbox from "./Pages/Inbox";
import Sent from "./Pages/Sent";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/home" element={<Home />} >
      <Route path="inbox" element={<Inbox />} />
      <Route path="sent" element={<Sent />} />
      </Route>
      <Route path="/compose" element={<Compose />} />
    </Routes>
  );
}

export default App;
