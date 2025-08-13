import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faTruck } from '@fortawesome/free-solid-svg-icons';
import heart from '../assets/heart.png'
import red from '../assets/red.png'
import { useNavigate } from 'react-router-dom';



export default function SpecialFood({ data }) {
    const navigate = useNavigate()

    const handleRoute = () => {
        navigate(`/viewshoe/${data._id}`);
    };

    return (
        <div onClick={() => handleRoute()} className=" rounded-2xl py-3 bg-white shadow-lg  p-2 w-[300px]">
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
                <div className="text-lg flex justify-between px-1 font-semibold mb-1  text-gray-800">
                    <div className='leading-tight'>{data.shoes_name}</div>
                    <div className='whitespace-nowrap'><span className='text-purple-600'>ETB</span> {data.Price}</div>

                </div>
                <div className='text-[11px]'>{data.description.slice(0, 90)}</div>

            </div>
        </div>
    );
}
