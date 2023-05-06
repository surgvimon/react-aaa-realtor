import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const[message, setMessage] = useState("");

  useEffect(()=>{
    async function getLandlord(){
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    }
    
    getLandlord();
  }, [userRef]);
  function onChange(e){
    setMessage(e.target.value);

  }
  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p>
            Contact {landlord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="flex w-full flex-col mt-6">
            <textarea 
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="text-gray-800 px-4 py-3 w-full"
            >
            </textarea>
            <a href={`mailto:${landlord.email}? Subject=${listing.name}&body=${message}`} >
              <button className="w-full px-7 py-3 bg-blue-600 text-center rounded shadow-md hover:bg-blue-700 hover:shadow-lg mt-6 text-white uppercase font-sm transition duration-150 ease-in-out">Send Message</button>
            </a>
          </div>
        </div>
      )}
    </>
    
  )
}
