import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaShare, FaShoppingCart } from 'react-icons/fa';
// import Loader from '../utils/Loader';
import useStore from '../zustand/store';
import gif from '../assets/new.gif'

export default function Viewshoe() {
    const navigate = useNavigate()
    const { cart, setCart } = useStore()
    const { id } = useParams()
    const [shoe, setShoe] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/shoes/${id}`);
                const data = await response.json()
                setShoe(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData()
    }, [id])


    // const isInCart = false
    const isInCart = shoe && cart.some((item) => item.shoe._id === shoe._id);

    const handleAddtoCart = () => {
        if (!isInCart && shoe) {
            const updatedCart = [...cart, { shoe, quantity: 1 }];
            setCart(updatedCart);
        }
    };

    const handleBuyNow = () => {
        if (shoe) {
            if (!isInCart) {
                const updatedCart = [...cart, { shoe, quantity: 1 }];
                setCart(updatedCart);
            }
            navigate('/cart');
        }
    };

    const handleRemoveFromCart = () => {
        const updatedCart = cart.filter((item) => item.shoe._id !== shoe._id);
        setCart(updatedCart);
    };


    if (loading) {
        return (
            <div>
                <div className=' min-h-screen bg-white pt-60'>
                    <img src={gif} alt="" />
                </div>
            </div>
        )
    }
    if (error) {
        return (
            <div>
                {error} ....
            </div>
        )
    }
    return (
        <div className=' flex relative flex-col bg-white justify-between h-screen'>
            <div>
                <div className='relative bg-slate-100 h-[45vh] mb-3 rounded-b-3xl overflow-hidden'>
                    <img className='w-full h-full object-cover' src={shoe.imgUrl[0]} alt={shoe.shoes_name} />

                    <div className='absolute top-5 left-5 flex items-center'>
                        <div onClick={() => { navigate(-1) }}>
                            <div className='p-2 rounded-xl bg-purple-700 bg-opacity-80'>
                                <FaArrowLeft className='text-xl text-white' />
                            </div>
                        </div>
                    </div>

                    <Link to={'/cart'} className="p-3 absolute bg-white top-5 right-5 rounded-xl shadow-lg">
                        <div className='relative'>
                            <FaShoppingCart className='text-xl' />
                            <div> {cart.length === 0 ? '' : (
                                <div className=' text-[9px] absolute -top-2 -right-2 text-center w-4 h-4 p-1 flex items-center justify-center rounded-full text-white bg-red-600'>
                                    {cart.length}
                                </div>
                            )}</div>
                        </div>



                    </Link>



                </div>
                <div>

                    <div className=' w-full flex px-6 justify-between  pb-3 '>
                        <div className='text-[25px] font-semibold'>{shoe.shoes_name}</div>
                        <div
                            onClick={() => {
                                isInCart ? handleRemoveFromCart() : handleAddtoCart();
                            }}
                            className={`p-2 px-4 flex gap-2 ${isInCart ? 'bg-slate-100' : 'bg-purple-500 text-white'} items-center text-lg font-semibold text-black w-fit rounded-2xl`}
                        >
                            {isInCart ? 'Remove' : 'Add'}<FaShoppingCart className={`${isInCart ? 'text-black' : 'text-white'}`} />
                        </div>



                    </div>


                    <div className='px-6'>
                        <div className='text-black mt-2 font-semibold text-[16px]'>{shoe.description}</div>
                    </div>

                    <div className='px-6  mt-3 '>

                        {/* <div className='text-xl font-semibold pb-2'>Tags :</div> */}
                        <div className='flex flex-wrap gap-2'>
                            <div className='bg-gray-200 px-2 text-[14px] rounded-lg'>#shoes</div>
                            <div className='bg-gray-200 px-2 text-[14px] rounded-lg'>#good</div>
                            <div className='bg-gray-200 px-2 text-[14px] rounded-lg'>#fit</div>
                            <div className='bg-gray-200 px-2 text-[14px] rounded-lg'>#sports</div>
                            <div className='bg-gray-200 px-2 text-[14px] rounded-lg'>#best</div>
                            <div className='bg-gray-200 px-2 text-[14px] rounded-lg'>#fit</div>
                            <div className='bg-gray-200 px-2 text-[14px] rounded-lg'>#shoes</div>
                        </div>



                    </div>

                </div>
            </div>


            <div className=' absolute bottom-0 text-white  w-full flex p-4 bg-purple-600  items-center rounded-t-3xl shadow-xl mt-2 px-5 justify-between'>
                <div>
                    <div className='text-3xl flex gap-2 items-start font-semibold'><span className='text-sm mt-1 font-normal'>ETB </span> {shoe.Price}</div>
                    <div className='text-white pt-1'>Total Paybill</div>
                </div>
                <div className='flex gap-2'>
                    <div onClick={() => handleBuyNow()} className='p-2 px-4 text-lg bg-slate-50 font-semibold text-black w-fit rounded-2xl'>Buy Now</div>

                </div>


            </div>
        </div>
    )
}
