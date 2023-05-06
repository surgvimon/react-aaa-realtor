import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/Sign-up" element={ <SignUp />} />
          <Route path="/Sign-in" element={ <SignIn />} />
          <Route path="/Offers" element={ <Offers />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={ <Profile />} />
          </Route>
          <Route path="/forgot-password" element={ <ForgotPassword /> } />
          <Route path="/create-listing" element={<PrivateRoute/>} >
            <Route path="/create-listing" element={  <CreateListing /> } />
          </Route>
          <Route path="/edit-listing" element={<PrivateRoute/>} >
            <Route path="/edit-listing/:id" element={  <EditListing /> } />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </>
  );
}

export default App;
