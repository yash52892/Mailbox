import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./Pages/Authpage";
import Home from "./Pages/Home";


function App() {
  return (
    <Routes>
    <Route path="/login" element={<AuthPage/>}/>
    <Route path="/home" element={<Home/>}/>
    </Routes>
  );
}

export default App;
