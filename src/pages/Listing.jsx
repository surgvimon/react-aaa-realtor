import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipperCore, { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import 'swiper/css/bundle';
import {FaShare,FaMapMarkerAlt, FaBed, FaBath, FaParking,FaChair} from "react-icons/fa";
import {getAuth} from "firebase/auth";
import Contact from '../components/Contact';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function Listing() {
    const param = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    const [contactLandLoad, setContactLandLoad] = useState(false);
    const auth = getAuth();
    const position = [51.505, -0.09]

    SwipperCore.use(Autoplay, Navigation, Pagination);

    useEffect(()=>{
        async function fetchListing(){
            setLoading(true);
            const docRef = doc(db, "listings", param.listingId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setListing(docSnap.data());
                setLoading(false);
            }
        }
        fetchListing();
    }, [param.listingId]);

    if(loading){
        return <Spinner />
    }
    return (
        <main>
            <Swiper
                slidesPerView={1}
                navigation
                pagination={{ type: "progressbar" }}
                effect="fade"
                modules={[EffectFade]}
                autoplay={{ delay: 3000 }}
            >
                {listing.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                    <div
                    className="relative w-full overflow-hidden h-[300px]"
                    style={{
                        background: `url(${listing.imgUrls[index]}) center no-repeat`,
                        backgroundSize: "cover",
                    }}
                    ></div>
                </SwiperSlide>
                ))}
            </Swiper>
            <div 
                className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
                onClick={()=>{
                    navigator.clipboard.writeText(window.location.href);
                    setShareLinkCopied(true);
                    setTimeout(() => {
                        setShareLinkCopied(false);
                    }, 2000);
                }}
            >
                    <FaShare className="text-lg text-slate-600"/>
            </div>
            <div className="flex flex-col max-w-6xl md:flex-row m-4 lg:mx-auto bg-white rounded-lg shadow-lg p-4 md:space-x-5 overflow-x-hidden">
                <div className="w-full">
                    <p className="text-2xl font-bold mb-3 text-blue-900">
                        {listing.name} - ฿ {listing.offer ? listing.discountedPrice 
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")  
                    : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")  
                    }</p>
                    <p className="flex justify-start items-center mt-6 mb-3 text-semibold">
                        <FaMapMarkerAlt className="text-green-700 mr-1"/>
                        {listing.address}
                    </p>
                    <div className="flex justify-start items-center space-x-4 w-[75%]">
                        <p className="w-full max-w-[200px] bg-red-800 p-1 rounded text-white text-center">
                            {listing.type === "rent" ? "Rent" : "Sale"}
                        </p>
                        { listing.offer && (
                            <p className="w-full max-w-[200px] bg-green-800 p-1 rounded text-white text-center">
                                ${+listing.regularPrice - +listing.discountedPrice}
                            </p>
                        )}
                    </div>
                    <p className="mt-3 mb-3">
                        <span>Description - </span>
                        <span>{listing.description}</span>
                    </p>
                    <ul className="flex space-x-6">
                        <li className="flex items-center whitespace-nowrap">
                            <FaBed className="text-lg mr-1"/>{+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaBath className="text-lg mr-1"/>{+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaParking className="text-lg mr-1"/>{+listing.parking  ? "Parking spot" : "No parking"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaChair className="text-lg mr-1"/>{+listing.furnished  ? "Parking spot" : "Not furnished"}
                        </li>
                    </ul>
                    {listing.userRef !== auth.currentUser?.uid && !contactLandLoad && (
                        <button onClick={()=> setContactLandLoad(true)} className="w-full px-7 py-3 bg-blue-600 text-center rounded shadow-md hover:bg-blue-700 hover:shadow-lg mt-6 text-white uppercase font-sm transition duration-150 ease-in-out">Contact Landlord</button>
                    )}
                    {contactLandLoad && <Contact userRef={listing.userRef} listing={listing} />}
                </div>
                <div className="w-full h-[200px] md:h-[300px] mt-6 md:mt-0">
                    <MapContainer 
                    center={[listing.geolocation.lat, listing.geolocation.lng]} zoom={13} scrollWheelZoom={false}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
                        <Popup>{listing.address}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>

            {shareLinkCopied && <p className="fixed top-[23%] right-[5%] z-10 bg-white text-black py-1 px-3 rounded overflow-x-hidden">Link Copied</p>}
        </main>
    )
}
