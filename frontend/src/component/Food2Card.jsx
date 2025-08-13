import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';
import { FaShoppingCart } from 'react-icons/fa';

export default function Food2Card({ data }) {
    const navigate = useNavigate()
    const [discription, setDiscription] = useState()
    const { cart, setCart } = useStore()

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

    useEffect(() => {

        try {
            setDiscription(data.discription.slice(0, 70))
        } catch (error) {
            console.log(error);
        }

    }, [])
    // Navigate to the detailed page for the food item
    const handleRoute = () => {
        navigate(`/viewshoe/${data._id}`);
    };

    return (
        <div
            onClick={handleRoute}
            className=" px-2 py-2  flex flex-col justify-between w-full shadow-lg rounded-2xl"
        >
            <div className="relative">
                <div className="w-full relative flex justify-center">
                    <div
                        className="absolute px-3 py-1 rounded-xl text-[12px] text-white  bg-purple-500 bg-opacity-55 top-2 right-2"
                    >
                        {data.type}
                    </div>
                    <img
                        className="w-full h-28 object-cover rounded-xl shadow-md"
                        src={data.imgUrl[0]}
                        alt={data.shoes_name}
                    />
                </div>
                <div className="text-sm mt-2 mb-2 leading-tight font-semibold">{data.shoes_name}</div>
                <p className="text-[10px] pb-2 text-gray-700">
                    {discription}
                </p>

            </div>

            <div className="flex items-center justify-between">
                <div className="text-end text-xl text-green-500 font-semibold">
                    <span className="text-sm font-normal">ETB</span>
                    {data.Price}
                </div>

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
    );
}
