import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import useStore from '../zustand/store';

export default function Cart() {
    const { cart, setCart, setUserLocation, setLocationError } = useStore();
    const navigate = useNavigate();
    const [error, setError] = useState()

    const handleAddItem = (id) => {
        setCart(cart.map(item =>
            item.shoe._id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };


    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setCart(false);
    //     }, 2000);

    //     return () => clearTimeout(timer);
    // }, [cart]);


    const handleRemoveItem = (id) => {
        setCart(cart.map(item =>
            item.shoe._id === id ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const removeshoe = (id) => {
        setCart(cart.filter(item =>
            item.shoe._id !== id
        ));
    }

    const getUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        setLocationError("You need to allow location access to use this feature.");
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        setLocationError("Location information is unavailable.");
                    } else {
                        setLocationError("An unknown error occurred.");
                    }
                }
            );
        } else {
            setLocationError("Geolocation is not supported by this browser.");
        }
    };

    const handleAddMoreshoe = () => {
        navigate('/shoe');
    };

    const totalPrice = cart.reduce(
        (acc, item) => acc + item.shoe.Price * item.quantity,
        0
    );




    return (
        <div className="flex relative flex-col bg-white justify-between h-screen">
            {error &&
                <div className='absolute text-white bg-red-500 px-3 py-1 rounded-xl bottom-20 right-2'>{error}</div>
            }
            <div className="flex-grow p-4">
                <div className='flex items-center justify-between'>
                    <div className='p-3 shadow-lg rounded-xl'>
                        <div onClick={() => navigate(-1)}>
                            <FaArrowLeft className='text-xl' />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-center">My Cart</h1>

                    <div onClick={handleAddMoreshoe} className='bg-purple-500 text-3xl text-white font-bold rounded-2xl w-12 flex justify-center items-center h-12'><div>+</div></div>

                </div>

                <div className="space-y-2 h-[80vh] pt-5 px-3 overflow-y-scroll">
                    {cart.map(item => (
                        <div
                            key={item.shoe._id}
                            className="flex items-center relative  bg-white gap-4 shadow-lg rounded-2xl py-2 px-1"
                        >
                            <img className='w-32 h-28 object-cover rounded-2xl' src={item.shoe.imgUrl} alt="" />
                            <div>
                                <div className='leading-[.9] mb-3'>
                                    <div className='flex justify-between items-center'>
                                        <p className="text-purple-600 text-2xl flex items-start font-semibold "><span className='text-lg text-black'>ETB</span>{item.shoe.Price.toFixed(2)}</p>
                                        <div className='absolute top-3 right-4' onClick={() => removeshoe(item.shoe._id)}>
                                            <FaTrash className='text-black hover:text-red-600 text-lg' />
                                        </div>

                                    </div>

                                    <h2 className="text-lg text-black font-semibold">{item.shoe.shoe_name ? item.shoe.shoe_name : item.shoe.drink_name}</h2>
                                    <div className='text-gray-400'>Shoe Size : {item.shoe.shoe_Size}</div>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <button
                                        onClick={() => handleRemoveItem(item.shoe._id)}
                                        className="bg-slate-200 text-black px-2  flex justify-center items-center  rounded-lg text-3xl"
                                    >
                                        <div>-</div>
                                    </button>
                                    <p className="text-2xl  ">{item.quantity}</p>

                                    <button
                                        onClick={() => handleAddItem(item.shoe._id)}
                                        className="bg-slate-200 text-black px-2 flex justify-center items-center rounded-lg text-3xl"
                                    >
                                        <div>+</div>
                                    </button>
                                </div>


                            </div>

                        </div>
                    ))}

                </div>

            </div>

            <div className='flex items-center p-3 pt-0 justify-between'>
                <div className="border-t">
                    <div className="flex gap-2  items-center font-bold">
                        <span className='text-sm text-black'>Total:</span>
                        <span className='text-3xl text-purple-500 flex items-start'>{totalPrice.toFixed(2)}<span className='text-[14px] font-normal text-black'>ETB</span></span>
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (cart.length > 0) {
                            navigate('/checkout')
                            getUserLocation()
                        }
                        else {
                            setError('Please Select Products To CheckOut')
                        }


                    }}

                    className="bg-purple-500 text-xl rounded-3xl text-white w-fit px-5 py-3 text-center text-semibold"
                >
                    Checkout
                </button>
            </div>



            {/* <Navigation /> */}
        </div>
    );
}
