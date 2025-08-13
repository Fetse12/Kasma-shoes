import React, { useMemo } from 'react';
import Navigation from '../../component/navigation';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';
import filterShoes from '../../utils/filterShoes';
import Food2Card from '../../component/Food2Card';

export default function GetShoe() {
    const { cart, shoes } = useStore();
    const location = useLocation();
    const navigate = useNavigate()
    const filters = location.state;

    const filteredShoes = useMemo(() => {
        return filterShoes(shoes, filters.gender, filters.Age, filters.selectedShoeType, filters.ShoeSize);
    }, [shoes, filters.gender, filters.Age, filters.selectedShoeType, filters.ShoeSize]);

    return (
        <div className="flex flex-col justify-between h-screen bg-gray-100">
            <div>
                <div className="flex-grow p-4">
                    <div className='flex justify-between mb-2 items-center'>
                        <div onClick={() => navigate(-1)}>
                            <div className='p-3 rounded-xl shadow-lg'>
                                <FaArrowLeft className='text-xl' />
                            </div>
                        </div>
                        <div className='text-2xl font-bold'>Get Your Shoe</div>
                        <Link to={'/cart'} className="p-3 relative rounded-xl shadow-lg">
                            <FaShoppingCart className='text-xl' />
                            {cart.length > 0 && (
                                <div className='absolute top-2 right-1 text-[9px] text-center w-4 h-4 p-1 flex items-center justify-center rounded-full text-white bg-red-600'>
                                    {cart.length}
                                </div>
                            )}
                        </Link>
                    </div>
                </div>

                <div className="grid pt-5 grid-cols-2 h-[80vh] mx-1 overflow-auto gap-2 justify-between px-5">
                    {filteredShoes.map((data) => (
                        <Food2Card key={data._id} data={data} />
                    ))}
                </div>
            </div>

            <Navigation />
        </div>
    );
}
