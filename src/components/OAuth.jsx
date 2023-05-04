import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { toast} from "react-toastify";
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const navigate = useNavigate()
  async function onGoogleClick (){
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate("/");
    } catch (error) {
      toast.error("Cloud not authorize with google")
    }
  }
  return (
    <button type="button" onClick={onGoogleClick} className='flex justify-center items-center w-full bg-red-600 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-700 active:bg-red-800 shadow-md rounded transition duration-150 ease-in-out'>
      <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
      Continue with Google
    </button>
  )
}
