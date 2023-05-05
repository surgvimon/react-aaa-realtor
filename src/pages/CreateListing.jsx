import React from 'react'
import { useState } from 'react';

export default function CreateListing() {
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: true,
        regularPrice: 0,
        discountedPrice: 0,
    });
    const { type,name, bedrooms, bathrooms , parking, furnished, address, description, offer, regularPrice, discountedPrice} = formData;
    function onChange() {

    }
  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className="text-3xl text-center mt-6 font-bold">CreateListing</h1>
        <form>
            <p className='text-lg mt-6 font-semibold'>sell / rent</p>
            <div className="flex">
                <button 
                type='button' 
                id="type" 
                value="Sale"
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 w-full ${ type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                sell</button>
                <button 
                type='button' 
                id="type" 
                value="rent"
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 w-full ${ type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                rent</button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Name</p>
            <div>
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    placeholder="Name" 
                    onChange={onChange} 
                    maxLength="32" 
                    minLength="32"
                    required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6"
                />
            </div>
            <div className="flex space-x-6 mb-6">
                <div>
                    <p className="text-lg font-semibold">Beds</p>
                    <input 
                        type="number" 
                        id="bedrooms" 
                        value={bedrooms} 
                        onChange={onChange} 
                        min="1" 
                        max="50" 
                        required
                        className="w-full px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:border-slate-700 text-center"
                    />
                </div>
                <div>
                    <p className="text-lg font-semibold">Bath</p>
                    <input 
                        type="number" 
                        id="bathrooms" 
                        value={bathrooms} 
                        onChange={onChange} 
                        min="1" 
                        max="50" 
                        required
                        className="w-full px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:border-slate-700 text-center"
                    />
                </div>
            </div>
            <p className='text-lg mt-6 font-semibold'>parking</p>
            <div className="flex">
                <button 
                type='button' 
                id="parking" 
                value={true}
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 w-full ${ !parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                yes</button>
                <button 
                type='button' 
                id="parking" 
                value={false}
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 w-full ${ parking  ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                no</button>  
            </div>
            <p className='text-lg mt-6 font-semibold'>Furnished</p>
            <div className="flex">
                <button 
                type='button' 
                id="furnished" 
                value={false}
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 w-full ${ !furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                yes</button>
                <button 
                type='button' 
                id="furnished" 
                value={true}
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 w-full ${ furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                no</button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Address</p>
            <div>
                <textarea 
                    type="text" 
                    id="address" 
                    value={address} 
                    placeholder="Address" 
                    onChange={onChange} 
                    required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600"
                />
            </div>
            <p className='text-lg mt-6 font-semibold'>Description</p>
            <div>
                <textarea 
                    type="text" 
                    id="description" 
                    value={description} 
                    placeholder="Description" 
                    onChange={onChange} 
                    required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6"
                />
            </div>
            <p className='text-lg font-semibold'>offer</p>
            <div className="flex mb-6 ">
                <button 
                type='button' 
                id="offer" 
                value={true}
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 w-full ${ !offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                yes</button>
                <button 
                type='button' 
                id="offer" 
                value={false}
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-200 w-full ${ offer  ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                no</button>  
            </div>
            <div>
                <div>
                    <p className="text-lg font-semibold">Regular Price</p>
                    <div className="mb-6 flex justify-center items-center space-x-6">
                        <input 
                            type="number" 
                            id="regularPrice" 
                            value={regularPrice}
                            onChange={onChange}
                            min="50"
                            max="400000000"
                            required
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:border-slate-600 text-center"
                        />
                        { type === "rent" && (
                            <div><p  className='ml-6 xt-md w-full whitespace-nowrap'>฿ / Month</p></div>
                        ) }
                    </div>
                </div>
            </div>
            { offer && (
                <div>
                    <div>
                        <p className="text-lg font-semibold">Discounted Price</p>
                        <div className="mb-6 flex justify-center items-center space-x-6">
                            <input 
                                type="number" 
                                id="discountedPrice" 
                                value={discountedPrice}
                                onChange={onChange}
                                min="50"
                                max="400000000"
                                required={offer}
                                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:border-slate-600 text-center"
                            />
                            { type === "rent" && (
                                <div><p  className='ml-6 xt-md w-full whitespace-nowrap'>฿ / Month</p></div>
                            ) }
                        </div>
                    </div>
                </div>       
            )}
            <div className='mb-6'>
                <p className="text-lg font-semibold">Images</p>
                <p className="text-gray-600">The first image will be the cover(max 6) </p>
                <input 
                    type="file" 
                    id="images" 
                    onChange={onChange} 
                    accept=".png, .jpg, .jpeg"
                    multiple
                    required
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:border-slate-600"
                />
            </div>
            <button type="submit" className="w-full text-white bg-blue-600 rounded px-7 py-3 mb-6 shadow-md hover:bg-blue-700 hover:shadow-lg font-medium">Create Listing</button>
        </form>
    </main>
  )
}
  