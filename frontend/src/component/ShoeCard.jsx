import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faTruck } from '@fortawesome/free-solid-svg-icons';
import heart from '../assets/heart.png'
import red from '../assets/red.png'
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';
import { FaShoppingCart } from 'react-icons/fa';



export default function ShoeCard({ data }) {
    const { cart, setCart } = useStore()
    const navigate = useNavigate()

    const handleRoute = () => {
        navigate(`/viewshoe/${data._id}`);
    };
    const isInCart = data && cart.some((item) => item.shoe._id === data._id);

    const handleAddtoCart = () => {
        if (!isInCart && data) {
            const updatedCart = [...cart, { shoe: data, quantity: 1 }];
            setCart(updatedCart);
        }
        navigate('/cart')

    };


    const handleRemoveFromCart = () => {
        const updatedCart = cart.filter((item) => item.shoe._id !== data._id);
        setCart(updatedCart);

    };


    return (
        <div onClick={() => handleRoute()} className=" rounded-2xl bg-white shadow-xl   px-2 py-2 w-full">
            <div className='relative'>
                <img src={data.imgUrl[0]} alt={data.shoes_name} className="w-full h-36 rounded-lg object-cover" />
                <div className='absolute top-1 right-1 p-1  rounded-full bg-opacity-55 bg-white'>
                    <div className="w-full relative flex justify-center">
                        <div

                            className="absolute px-2 text-white rounded-full text-[14px] font-semibold bg-purple-700 bg-opacity-65 top-[2px] right-[2px]"
                        >
                            {data.type}
                        </div>

                    </div>
                </div>

            </div>

            <div className="w-full mt-2">
                <div className="text-sm flex flex-col gap-3 justify-between px-1 font-semibold mb-1  text-gray-800">
                    <div className='leading-tight'>{data.shoes_name}</div>
                    <div className='flex justify-between items-center'>
                        <div className='whitespace-nowrap'><span className='text-purple-600'>ETB</span> {data.Price}</div>

                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                                isInCart ? handleRemoveFromCart() : handleAddtoCart();
                            }}
                            className={`px-2 py-1 flex gap-2 ${isInCart ? 'bg-slate-100' : 'bg-gray-800 text-white'} items-center text-[12px] font-semibold text-black w-fit rounded-xl`}
                        >
                            {isInCart ? 'Remove' : 'Add'}<FaShoppingCart className={`${isInCart ? 'text-black' : 'text-white'}`} />
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
}
