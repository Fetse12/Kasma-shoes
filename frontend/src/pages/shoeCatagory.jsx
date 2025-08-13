import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaFilter, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import Carousel from '../component/Carsel';
import useStore from '../zustand/store';
import gif from '../assets/new.gif'


export default function ShoeCategory() {
    const { shoes, cart } = useStore();
    const { type } = useParams();
    const navigate = useNavigate();

    const [shoeItems, setShoeItmes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(shoes);

        const filteredItems = shoes.filter((fo) => fo.shoes_type === 'girl');
        setShoeItmes(filteredItems);
        setCurrentPage(0);
        setIsLoading(false);
    }, [type, shoes]);

    const itemsPerPage = 4;
    const totalPages = Math.max(Math.ceil(shoeItems.length / itemsPerPage), 1); // Ensure totalPages is at least 1

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) < totalPages ? prevPage + 1 : 0);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };

    // Calculate the current items to display
    const startIndex = currentPage * itemsPerPage;
    const currentItems = shoeItems.slice(startIndex, startIndex + itemsPerPage);

    // Swipe handling
    const handlers = useSwipeable({
        onSwipedLeft: handleNextPage,
        onSwipedRight: handlePrevPage,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    // Show loading spinner or content based on loading state
    if (isLoading) {
        return <div>
            <div className='mt-60'>
                <img src={gif} alt="" />
            </div>
        </div>
    }

    return (
        <div className="py-3 h-screen flex flex-col justify-between pb-8 bg-white overflow-hidden" {...handlers}>
            <div>
                <div className='flex justify-between px-5 items-center'>
                    <div onClick={() => { navigate(-1) }}>
                        <div className='p-3 rounded-xl shadow-lg'>
                            <FaArrowLeft className='text-xl' />
                        </div>
                    </div>
                    <div className='text-2xl font-semibold'>{type === 'girl' ? 'Girls' : type === 'boy' ? 'Boys' : type === 'men' ? 'Mens' : type === 'women' ? 'Womens' : ''}</div>
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
                <div className="flex px-5 items-center mt-6 justify-end">

                    <div className="text-xl bg-purple-500 px-3 rounded-xl py-1 flex gap-2 items-center text-white font-semibold">Filter <FaFilter className='text-sm text-white' /> </div>
                </div>

                <div className="mt-3 w-full">
                    {shoeItems ? <Carousel componentCards={currentItems} /> : <div className='text-center text-2xl text-black font-semibold'>No Shoes Found</div>

                    }
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between px-5 mt-4">
                <button
                    onClick={handlePrevPage}
                    className="px-4 py-2 font-semibold text-white bg-purple-500 rounded disabled:bg-purple-200 hover:bg-purple-600 transition"
                >
                    <FaArrowLeft />
                </button>
                <span>Page {currentPage + 1} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    className="px-4 py-2 font-semibold text-white bg-purple-500 rounded disabled:bg-purple-200 hover:bg-purple-600 transition"
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}
