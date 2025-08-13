import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import male from '../../assets/male.png'
import female from '../../assets/female.png'
import useStore from '../../zustand/store';
import Navigation from '../../component/navigation';


export default function Page1() {
    const { cart } = useStore()
    const [gender, setgender] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        if (gender !== '') {
            navigate('/getShoe/page2', { state: gender })
        }
    }, [gender])

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
                    <div className='text-2xl font-semibold mb-3 text-center'> What Kind Of Shoes Are You looking for ?</div>
                    <div className='flex gap-5'>
                        <div onClick={() => setgender('male')} className='p-3 rounded-xl hover:bg-purple-400 shadow-xl flex flex-col items-center'>
                            <img className='w-20' src={male} alt="" />
                            <div className='text-xl'>Male Shoes</div>
                        </div>
                        <div onClick={() => setgender('female')} className='p-3 rounded-xl  hover:bg-purple-400  shadow-xl flex flex-col items-center'>
                            <img className='w-20' src={female} alt="" />
                            <div className='text-xl'>Female Shoes</div>
                        </div>
                    </div>
                </div>

            </div>


            <Navigation />
        </div>

    );
}
