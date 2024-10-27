import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./Pages/Authpage";
import Home from "./Pages/Home";
import Compose from "./Pages/Compose";
import Inbox from "./Pages/Inbox";
import Sent from "./Pages/Sent";
import Email from "./Pages/Email";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<Home />} >
      <Route path="/home/inbox" element={<Inbox />} />
      <Route path="/home/inbox/email" element={<Email/>} />
      <Route path="sent" element={<Sent />} />
      </Route>
      <Route path="/compose" element={<Compose />} />
    </Routes>
  );
}

export default App;
