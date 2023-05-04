import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Header() {
  const [pageStatus, setPageStatus] = useState("Sign in"); 
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setPageStatus("Profile");
      }else {
        setPageStatus("Sign in");
      }
    });
  }, [auth]);
  function pathMathRoute(route){
    if(route === location.pathname){
      return true
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
            <img 
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" 
            alt='logo' 
            className='h-5 cursor-pointer'
            onClick={() => navigate("/")}
            />
        </div>
        <div>
            <ul className='flex space-x-10'>
                <li 
                className={`cursor-pointer text-gray-400 py-3 text-sm font-semibold border-b-[3px] ${pathMathRoute("/") ? "text-black border-b-red-400" : "border-b-transparent" }`}
                onClick={() => navigate("/")}
                >Home</li>
                <li 
                className={`cursor-pointer text-gray-400 py-3 text-sm font-semibold border-b-[3px] ${pathMathRoute("/offers") ? "text-black border-b-red-400" : "border-b-transparent" }`}
                onClick={() => navigate("/offers")}
                >Offers</li>
                <li 
                className={`cursor-pointer text-gray-400 py-3 text-sm font-semibold border-b-[3px] ${(pathMathRoute("/sign-in") || pathMathRoute("/profile"))? "text-black border-b-red-400" : "border-b-transparent" }`}
                onClick={() => navigate("/profile")}
                >{pageStatus}</li>
            </ul>
        </div>
      </header> 
    </div>
  )
}
