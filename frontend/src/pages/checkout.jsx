import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';
import Navigation from '../component/navigation';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

export default function CheckOut() {
    const navigate = useNavigate();
    const { cart, setCart } = useStore();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        console.log(cart);
        if (!name || !phone || !address) {
            setError("Please fill all the fields");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/order/sendToBot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, phone, address, data: cart }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong with the submission');
            }

            // Clear form fields and cart
            setName('');
            setPhone('');
            setAddress('');
            setCart([]);

            // Navigate to success page after successful submission
            navigate('/success', {
                state: {
                    name: name,
                    phone: phone,
                    address: address
                }
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex pt-3 flex-col justify-between">
            <div>
                <div className='flex px-4 pb-3 justify-between items-center'>
                    <div onClick={() => navigate(-1)}><div className='p-3 rounded-xl shadow-lg'><FaArrowLeft className='text-xl' /></div></div>
                    <div className='text-2xl  font-bold'>Delivery Form</div>
                    <Link to={'/cart'} className="p-3 relative rounded-xl shadow-lg">
                        <FaShoppingCart className='text-xl' />
                        {cart.length === 0 ? '' : (
                            <div className='absolute top-2 right-1 text-[9px] text-center w-4 h-4 p-1 flex items-center justify-center rounded-full text-white bg-red-600'>
                                {cart.length}
                            </div>
                        )}

                    </Link>
                </div>
                <div className='text-xl font-bold text-purple-700 text-center px-6 pt-12'>
                    Fill Out All The Filds And We Will Contact You
                </div>
                <div className="flex-grow flex justify-center items-center px-3 py-10 pt-0">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
                    >

                        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">Your Name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder='Eg: John Doe'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCA5CA]"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="phone">Your Phone:</label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                placeholder='Eg: 0917987181'
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCA5CA]"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="address">Your Address:</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                placeholder='Eg: Semit Geiorgis, Addis Ababa'
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCA5CA]"
                                required
                            />
                        </div>
                        <div className='text-gray-500 mb-6 text-[14px]'>
                            Contact us with <a className='text-purple-900' href="tel:+251 96 770 5763">0967705763</a> or telegram<a className='text-purple-900' href="https://t.me/azariel_t"> @azariel_t</a>
                        </div>
                        {error && <p className="text-red-500  mb-2">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>

            <Navigation />

        </div>
    );
}
