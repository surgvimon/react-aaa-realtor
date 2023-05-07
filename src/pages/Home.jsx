import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";
import { db } from "../firebase";


export default function Home() {
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fetchListings2() {
      try {
        const listingsRef2 = collection(db, "listings");
        const q = query(
          listingsRef2,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings2 = [];
        querySnap.forEach((doc) => {
          return listings2.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings2);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings2();
  }, []);

  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  return (
    <main>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
            <div>
              <h2 className="text-2xl px-3 mt-6 text-semibold">Recent Offer</h2>
              <Link to="/offers">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                  Show more offers
                </p>
              </Link>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                {offerListings.map((listing)=>(
                  <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
                ))}
              </ul>
            </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {rentListings && rentListings.length > 0 && (
            <div>
              <h2 className="text-2xl px-3 mt-6 text-semibold">Places for rent</h2>
              <Link to="/category/rent">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for rent
                </p>
              </Link>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                {rentListings.map((listing)=>(
                  <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
                ))}
              </ul>
            </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {saleListings && saleListings.length > 0 && (
            <div>
              <h2 className="text-2xl px-3 mt-6 text-semibold">Places for sale</h2>
              <Link to="/category/sale">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for sale
                </p>
              </Link>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                {saleListings.map((listing)=>(
                  <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
                ))}
              </ul>
            </div>
        )}
      </div>

    </main>
  )
}
