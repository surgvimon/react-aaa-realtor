import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipperCore, { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import 'swiper/css/bundle';

export default function Listing() {
    const param = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
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
        </main>
    )
}
