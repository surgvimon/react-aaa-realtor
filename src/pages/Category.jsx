import React, { useEffect, useState } from 'react'
import { toast} from "react-toastify";
import {collection, doc, getDocs, orderBy, query, where, limit, startAfter} from "firebase/firestore";
import Spinner from "../components/Spinner";
import {db} from "../firebase";
import ListingItem from "../components/ListingItem";
import { useParams } from 'react-router-dom';

export default function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState();
  const params = useParams();
  useEffect(()=>{
    async function fetchListings(){
        try {
            const listingRef = collection(db, "listings");
            const q = query(listingRef, 
            where("type", "==", params.categoryName),
            orderBy("timestamp", "desc"),
            limit(8)
            ); 
            const querySnap = await getDocs(q);
            const lastVisible = querySnap.docs[querySnap.docs.length - 1 ];
            setLastFetchListing(lastVisible);
            const listings = [];
            querySnap.forEach((doc)=>{
            return listings.push({
                id: doc.id,
                data: doc.data()
            });
            });
            setListings(listings);
            setLoading(false);
        } catch (error) {
            toast.error("Could not fetch listing.");
        }
    }
    fetchListings();
  }, [params.categoryName]);

  async function onFetchMoreListings(){
    try {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, 
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(4)
      ); 
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1 ];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data: doc.data()
        });
      });
      setListings((prevState)=>[...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listing.");
    }
  }
  return (
    <div className="max-w-6xl px-3 mx-auto mt-6">
      <h1 className="text-3xl text-center font-semibold">{`Places for ${params.categoryName}`}</h1>
      {loading ? (
        <Spinner />
      ): listings && listings.length > 0 ? (
        <>
        <main className="mt-6">
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing)=>(
              <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
            ))}
          </ul>
        </main>
        {lastFetchListing && (
          <div className="flex justify-center items-center">
            <button className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out" onClick={onFetchMoreListings}>Load more</button>
          </div>
        )}
        </>
      ):(
        <p>There are no current offers.</p>
      )}
    </div>
  )
}
