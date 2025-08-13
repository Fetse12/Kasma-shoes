import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaFilter, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Category from '../component/Catagory';
import Food2Card from '../component/Food2Card';
import useStore from '../zustand/store';

export default function Shoe() {
    const { shoes, cart } = useStore();

    const [shoe, setShoe] = useState([]);
    const navigate = useNavigate();

    // Merge food and habesha items only when they change
    useEffect(() => {
        setShoe(shoes);
    }, [shoes]);


    const HandeleShoeType = (type) => {
        const filterdShoes = shoes.filter((fo) => fo.type === type)
        setShoe(filterdShoes)
    }

    return (
        <div className="py-3 h-screen bg-white overflow-hidden">
            <div className="flex justify-between px-5 mb-4 items-center">
                {/* Back Button */}
                <button onClick={() => navigate(-1)} className="p-3 rounded-xl shadow-lg">
                    <FaArrowLeft className="text-xl" />
                </button>
                <div className="text-2xl font-semibold">Categories</div>
                <Link to={'/cart'} className="p-3 relative rounded-xl shadow-lg">
                    <FaShoppingCart className='text-xl' />
                    {cart.length === 0 ? '' : (
                        <div className='absolute top-2 right-1 text-[9px] text-center w-4 h-4 p-1 flex items-center justify-center rounded-full text-white bg-red-600'>
                            {cart.length}
                        </div>
                    )}

                </Link>
            </div>

            {/* Categories Section */}
            {/* <div className="flex px-5 items-center mt-4 justify-between">
                <div className="text-xl font-semibold">Categories</div>
                <div className="flex items-center ">
                     <div className="text-sm bg-purple-500 px-3 rounded-xl py-1 flex gap-2 items-center text-white font-semibold">Filter <FaFilter className='text-[10px] text-white' /> </div>
                </div>
            </div> */}
            <Category HandeleShoeType={HandeleShoeType} />

            {/* Scrollable Content Section */}
            <div className="grid pt-5 grid-cols-2 h-[75vh] mx-1 overflow-auto gap-2 justify-between px-5">
                {shoe.map((data) => (
                    <Food2Card key={data._id} data={data} />
                ))}
            </div>
        </div>
    );
}
