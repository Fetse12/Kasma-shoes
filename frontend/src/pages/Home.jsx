import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaShoePrints, FaShoppingCart, FaTimes, FaUtensils } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import girl from '../assets/girl.jpeg'
import boy from '../assets/boy.jpeg'
import men from '../assets/men.jpeg'
import women from '../assets/women.jpeg'
import logo from '../assets/kasma.jpg'


import useStore from '../zustand/store';
import fetchShoes from '../hook/fetchShoes';
import Navigation from '../component/navigation';
import SearchBar from '../component/serachBar';
import SpecialFood from '../component/SpecilFood';
import ShoeCard from '../component/ShoeCard';
import SideBar from '../component/SideBar';
// import GetUsersLocation from '../hook/GetUsersLocation';
// import TelegramWebApp from '../hook/getTelegramUser';

export default function Home() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const sidebarRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { shoes, cart, userLocation } = useStore();
    const [special, setSpecial] = useState([]);

    // hooks
    fetchShoes()


    useEffect(() => {
        const filteredshoe = shoes.filter((item) => item.isSpecial);

        setSpecial(filteredshoe);
    }, [shoes]);


    useEffect(() => {
        const container = containerRef.current;
        let scrollInterval;

        if (container && !isPaused) {
            let index = 0;
            scrollInterval = setInterval(() => {
                const scrollAmount = container.scrollWidth / special.length;
                container.scrollTo({
                    left: index * scrollAmount,
                    behavior: 'smooth',
                });

                index = (index + 1) % special.length;
            }, 2000); // Change scroll every 2 seconds
        }

        return () => clearInterval(scrollInterval);
    }, [special, isPaused]);

    const handleMouseDown = () => setIsPaused(true);
    const handleMouseUp = () => setIsPaused(false);
    const handleTouchStart = () => setIsPaused(true);
    const handleTouchEnd = () => setIsPaused(false);
    const handleRouting = (categoryType) => {
        navigate(`/shoeCatagory/${categoryType}`);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);  // Cleanup
        };
    }, [menuOpen]);




    return (
        <div className='flex bg-white flex-col justify-between pb-20 min-h-screen'>
            {menuOpen && <SideBar setMenuOpen={setMenuOpen} />}

            <div className=''>
                <div className='flex justify-between px-5 items-center'>
                    <div className='text-2xl flex items-center gap-3   mb-4 mt-5'>
                        {menuOpen ? <FaTimes onClick={() => setMenuOpen(false)} className='text-xl  z-50 text-red-600' /> : <FaBars onClick={() => setMenuOpen(true)} className='text-xl text-black' />}

                    </div>
                    <div className='font-bold text-purple-600 text-2xl gap-2 flex items-center'>
                        <img src={logo} className='w-7 h-8' alt="" />  ሱቅ
                    </div>

                    <Link to={'/cart'} className="p-3 relative rounded-xl shadow-lg">
                        <FaShoppingCart className='text-xl' />
                        {cart.length === 0 ? '' : (
                            <div className='absolute top-2 right-1 text-[9px] text-center w-4 h-4 p-1 flex items-center justify-center rounded-full text-white bg-red-600'>
                                {cart.length}
                            </div>
                        )}

                    </Link>
                </div>

                <div className='px-5'>
                    <SearchBar />

                </div>

                <div
                    ref={containerRef}
                    className="w-full py-1 pl-5 flex gap-3 overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
                    onMouseEnter={() => setIsPaused(true)} // Pause when hovering
                    onMouseLeave={() => setIsPaused(false)} // Resume when not hovering
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {special.map((item) => (
                        <div
                            key={item._id}
                            className="snap-center w-full"
                        >
                            <SpecialFood data={item} />
                        </div>
                    ))}
                </div>

                <div>
                    <div

                        className="w-full py-1 px-2 grid grid-cols-2 gap-3 "
                    >
                        {special.map((item) => (
                            <div
                                key={item._id}
                                className="w-full " // Add margin for gap
                            >
                                <ShoeCard data={item} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div>
                    <div className='flex gap-2 items-center ml-5 mt-3 text-xl font-semibold'>
                        Choose Your shoes <FaShoePrints />
                    </div>

                    <div className='grid justify-center gap-2 p-4 px-9 pt-2 grid-cols-2'>
                        <div onClick={() => handleRouting('men')} className='relative shadow-lg rounded-xl shadow-purple-400'>
                            <div className='absolute top-2 z-10 text-xl font-semibold bg-purple-600 text-white px-4 py-1 bg-opacity-65 rounded-xl left-2'>Men</div>
                            <img className='w-full rounded-xl h-[125px] object-cover blur-[1px]' src={men} alt="" />
                        </div>
                        <div
                            // onClick={() => handleRouting('women')}
                            className='relative shadow-lg rounded-xl  shadow-purple-400'>
                            <div className='absolute top-2 z-10 text-xl font-semibold bg-purple-900 text-white px-4 py-1 bg-opacity-65 rounded-xl right-2'>Women</div>
                            <div className='absolute top-12 z-10 text-xl w-fit font-semibold bg-black text-white px-4 py-1 bg-opacity-65 rounded-xl left-6 right-2'>Coming Soon </div>

                            <img className='w-full rounded-xl h-[125px] object-cover blur-[3px]' src={women} alt="" />
                        </div>
                        <div
                            // onClick={() => handleRouting('boy')} 
                            className='relative shadow-lg rounded-xl shadow-purple-400'>
                            <div className='absolute bottom-2 z-10 text-xl font-semibold bg-purple-900 text-white px-4 py-1 bg-opacity-65 rounded-xl left-2'>Boy</div>
                            <div className='absolute top-2 z-10 text-xl w-fit font-semibold bg-black text-white px-4 py-1 bg-opacity-65 rounded-xl left-2 right-6'>Coming Soon </div>

                            <img className='w-full rounded-xl h-[125px] object-cover blur-[3px]' src={boy} alt="" />
                        </div>
                        <div
                            // onClick={() => handleRouting('girl')} 
                            className='relative shadow-lg rounded-xl shadow-purple-400'>
                            <div className='absolute bottom-2 z-10 text-xl font-semibold bg-purple-900 text-white px-4 py-1 bg-opacity-65 rounded-xl right-2'>Girl</div>
                            <div className='absolute top-2 z-10 text-xl w-fit font-semibold bg-black text-white px-4 py-1 bg-opacity-65 rounded-xl left-6 right-2'>Coming Soon </div>

                            <img className='w-full rounded-xl h-[125px] object-cover blur-[3px]' src={girl} alt="" />
                        </div>
                    </div>
                </div> */}

            </div>
            <Navigation />
        </div>
    );
}
