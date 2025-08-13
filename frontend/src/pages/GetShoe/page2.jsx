import React, { useEffect, useState } from 'react';
import Navigation from '../../component/navigation';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';
import kid from '../../assets/kid.png'
import adult from '../../assets/adult.png'


export default function Page2() {
    const { cart } = useStore()
    const [Age, setAge] = useState('')
    const location = useLocation()
    const value = location.state
    const navigate = useNavigate()


    useEffect(() => {
        if (Age !== '') {
            navigate('/getShoe/page3', { state: { Age, gender: value } })
        }
    }, [Age])

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
                        <div onClick={() => setAge('kid')} className='p-3 rounded-xl hover:bg-purple-400 shadow-xl flex flex-col items-center'>
                            <img className='w-20' src={kid} alt="" />
                            <div className='text-xl'>Kids Shoes</div>
                        </div>
                        <div onClick={() => setAge('adult')} className='p-3 rounded-xl  hover:bg-purple-400  shadow-xl flex flex-col items-center'>
                            <img className='w-20' src={adult} alt="" />
                            <div className='text-xl'>Adult Shoes</div>
                        </div>
                    </div>
                </div>



            </div>


            <Navigation />
        </div>

    );
}
