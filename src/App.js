import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Offers from "./pages/Offers"
import Profile from "./pages/Profile"
import ForgotPassword from "./pages/ForgotPassword"
import Header from "./pages/components/Header";

function App() {
  return (
    <>
    
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sign-up" element={ <SignUp />} />
        <Route path="/Sign-in" element={ <SignIn />} />
        <Route path="/Offers" element={ <Offers />} />
        <Route path="/profile" element={ <Profile />} />
        <Route path="/forgot-password" element={ <ForgotPassword />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
