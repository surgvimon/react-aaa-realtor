import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Offers from "./pages/Offers"
import Profile from "./pages/Profile"
import ForgotPassword from "./pages/ForgotPassword"

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={ <Home />}></Route>
        <Route path="/Sign-up" element={ <SignUp />}></Route>
        <Route path="/Sign-in" element={ <SignIn />}></Route>
        <Route path="/Offers" element={ <Offers />}></Route>
        <Route path="/profile" element={ <Profile />}></Route>
        <Route path="/forgot-password" element={ <ForgotPassword />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
