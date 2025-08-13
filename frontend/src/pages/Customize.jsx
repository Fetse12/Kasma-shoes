import React, { useState } from 'react'
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import useStore from '../zustand/store'
import Navigation from '../component/navigation'

export default function Customize() {
    const navigate = useNavigate();
    const { cart, setCart } = useStore();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [shoeSize, setShoeSize] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('shoeSize', shoeSize); // Adding shoe size to the form data
        if (image) {
            formData.append('photo', image);
        }
        if (!image || !name || !phone || !address || !shoeSize) {
            setError("Please fill all the fields");
            setIsLoading(false);
            return
        }

        try {
            // Replace this with your API endpoint for form submission
            await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            navigate('/customized_sucssus')
        } catch (err) {
            setError("Failed to submit. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex bg-white  flex-col justify-between'>
            <div className='overflow-y-scroll pb-20'>
                <div className='flex justify-between px-5 mt-3 items-center'>
                    <div onClick={() => { navigate(-1) }}>
                        <div className='p-3 rounded-xl shadow-lg'>
                            <FaArrowLeft className='text-xl' />
                        </div>
                    </div>
                    <div className='text-2xl font-bold '>Custom</div>
                    <Link to={'/cart'} className="p-3 relative rounded-xl shadow-lg">
                        <FaShoppingCart className='text-xl' />
                        {cart.length > 0 && (
                            <div className='absolute top-2 right-1 text-[9px] text-center w-4 h-4 p-1 flex items-center justify-center rounded-full text-white bg-red-600'>
                                {cart.length}
                            </div>
                        )}
                    </Link>
                </div>

                <div className='mt-10'>
                    <div className='px-4 text-xl text-center'>
                        Upload A picture of Shoe You Want and <span className='text-purple-600 font-semibold'>We Will Get</span> Your Shoe For you
                    </div>

                    <div className='mx-5 relative py-7 mt-6 rounded-xl flex justify-center items-center border-2 border-dashed border-slate-300'>
                        {preview ? (
                            <div className="">
                                <img src={preview} alt="Shoe Preview" className=" h-44 rounded-xl" />
                                <button
                                    onClick={() => {
                                        setImage(null);
                                        setPreview(null);
                                    }}
                                    className="absolute top-1 right-1 text-red-600 p-1 rounded-full"
                                >
                                    Change Image
                                </button>
                            </div>
                        ) : (
                            <label htmlFor="photo" className="p-1 text-xl text-gray-400 font-semibold rounded-xl cursor-pointer">
                                Upload Shoe Image
                            </label>
                        )}
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className='mx-5 mt-7'>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">Your Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                placeholder='Eg: John Doe'
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCA5CA]"
                                required
                            />
                        </div>
                        <div className='flex gap-3'>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="phone">Your Phone:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    placeholder='Eg: 0917209299'
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCA5CA]"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="shoeSize">Shoe Size:</label>
                                <input
                                    type="text"
                                    id="shoeSize"
                                    value={shoeSize}
                                    placeholder='Eg: 40'
                                    onChange={(e) => setShoeSize(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCA5CA]"
                                    required
                                />
                            </div>
                        </div>


                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="address">Your Address:</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                placeholder='Eg: Bole , Addis Ababa'
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCA5CA]"
                                required
                            />
                        </div>

                        {error && <p className="text-red-500  mb-2">{error}</p>}

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? 'posting...' : 'Get Custom Shoe'}
                        </button>
                    </div>
                </div>
            </div>

            <Navigation />
        </div>
    );
}
