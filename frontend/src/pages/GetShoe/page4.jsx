import React, { useEffect, useState } from 'react';
import Navigation from '../../component/navigation';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';


export default function Page4() {
    const { cart } = useStore()
    const [ShoeSize, setShoeSize] = useState('')
    const location = useLocation()
    const value = location.state

    const handleShoeSize = (id) => {
        setShoeSize(id)
    }
    const navigate = useNavigate()


    const handleRoute = () => {
        if (ShoeSize !== '') {
            navigate('/getShoe', { state: { ShoeSize, ...value } })

        }
    }



    return (
        <div className="flex flex-col justify-between h-screen bg-gray-100">
            <div>
                <div className="flex-grow p-4">
                    <div className='flex justify-between mb-4 items-center'>
                        <div onClick={() => navigate(-1)}>
                            <div className='p-3 rounded-xl shadow-lg'>
                                <FaArrowLeft className='text-xl' />
                            </div>
                        </div>
                        <div className='text-2xl font-bold'>Get Your Shoe</div>
                        <Link to={'/cart'} className="p-3 relative rounded-xl shadow-lg">
                            <FaShoppingCart className='text-xl' />
                            {cart.length === 0 ? '' : (
                                <div className='absolute top-2 right-1 text-[9px] text-center w-4 h-4 p-1 flex items-center justify-center rounded-full text-white bg-red-600'>
                                    {cart.length}
                                </div>
                            )}

                        </Link>
                    </div>
                </div>

                <div className='flex h-[70vh] flex-col justify-center items-center'>
                    <div className='text-2xl font-semibold mb-6 mx-2 text-center'> What Shoe Size Are You looking for?</div>
                    <div className='flex flex-col gap-5'>
                        <div className='flex gap-12 '>
                            <div onClick={() => handleShoeSize(25)} className={`text-xl px-4 py-1 ${ShoeSize === 25 ? 'bg-purple-600 text-white' : 'bg-gray-300'} rounded-xl `}>25-35</div>
                            <div onClick={() => handleShoeSize(35)} className={`text-xl px-4 py-1 ${ShoeSize === 35 ? 'bg-purple-600 text-white' : 'bg-gray-300'} rounded-xl `}>35-40</div>
                        </div>
                        <div className='flex gap-12'>
                            <div onClick={() => handleShoeSize(40)} className={`text-xl px-4 py-1 ${ShoeSize === 40 ? 'bg-purple-600 text-white' : 'bg-gray-300'} rounded-xl `}>40-45</div>
                            <div onClick={() => handleShoeSize(45)} className={`text-xl px-4 py-1 ${ShoeSize === 45 ? 'bg-purple-600 text-white' : 'bg-gray-300'} rounded-xl `}>45-50</div>

                        </div>
                        <div className='flex justify-center  mt-5'>
                            <div onClick={handleRoute} className='text-white text-center text-xl  w-fit bg-purple-600 px-5 rounded-xl py-1'>Next</div>

                        </div>

                    </div>
                </div>

            </div>


            <Navigation />
        </div>

    );
}
