import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import OAuth from './components/OAuth';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {db} from "../firebase"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { toast} from "react-toastify";
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    mame: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate()
  const {name, email, password} = formData;

  function onChange(e) {
    setFormData((prevState)=>({
      ...prevState,
     [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault()
    try{
      const auth = getAuth()
      const useCredential = await createUserWithEmailAndPassword( auth, email, password) 
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const user = useCredential.user
      const formDataCopy = {...formData}
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy)
      // toast.success("Sign Up to Succes")
      // navigate('/')

    }catch(error  ) {
         toast.error("Something went wrong with the registration")
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 mb:md-6'>
          <img src='https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80' alt="key" className='w-full rounded-2xl'/>
        </div>
        <div  className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
           <div>
              <input
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6' 
                type="text" 
                id="name" 
                value={name} 
                onChange={onChange}
                placeholder='Full name'
              />
            </div>

            <div>
              <input
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6' 
                type="email" 
                id="email" 
                value={email} 
                onChange={onChange}
                placeholder='Email address'
              />
            </div>
            <div className='relative'>
              <input
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6' 
                type={showPassword ? "text" : "password"} 
                id="password" 
                value={password} 
                onChange={onChange}
                placeholder='Password'
              />
              {showPassword ? (<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((preState) => !preState)}/>) : (<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((preState) => !preState)}/>)}
              <div className='flex justify-between mb-6'>
                <p>Have a account?
                  <Link 
                  to="/sign-in"
                  className='text-red-500 hover:text-red-600 transition duration-200 ease-in-out ml-1'
                  >Sign in</Link>
                </p>
                <p>
                  <Link 
                  to="/forgot-password"
                  className='text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out'
                  >Forgot Password?</Link>
                </p>
              </div>
            </div>
            <button 
              className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
              type='submit'>Sigin Up</button>
            <div className='flex my-4 items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth/>
          </form>
        </div>
      </div>
    </section>
  )
}
