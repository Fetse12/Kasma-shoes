import React, { useState } from 'react';
import Navigation from '../../component/navigation';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';


export default function Page3() {
    const { cart } = useStore()
    const [selectedShoeType, setSelectedShoeType] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const value = location.state

    const handleAddedSelected = (id) => {
        if (selectedShoeType.includes(id)) {
            const selected = selectedShoeType.filter((sel) => sel !== id)
            setSelectedShoeType(selected)
        } else {
            setSelectedShoeType([...selectedShoeType, id])
        }
    }
    const categories = [
        { id: 'sneakers', label: 'Sneakers' },
        { id: 'formal_shoes', label: 'Formal' },
        { id: 'boots', label: 'Boots' },
        { id: 'heels', label: 'Heels' },
        { id: 'athletic_shoes', label: 'Athletic' },
        { id: 'flip_flops', label: 'Flip-Flops' },
        { id: 'loafers', label: 'Loafers' },
        { id: 'sandals', label: 'Sandals' },
        { id: 'work_boots', label: 'Work Boots' },
        { id: 'running_shoes', label: 'Running' },
    ];

    const handleRoute = () => {
        navigate('/getShoe/page4', { state: { selectedShoeType, ...value } })
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
                    <div className='text-2xl font-semibold mb-3 text-center'> Select The Type Of Shoes You looking for ?</div>
                    <div className='flex flex-wrap gap-1 items-center w-full px-3'>
                        {categories.map((cat) => (
                            <div key={cat.id} onClick={() => handleAddedSelected(cat.id)} className={`px-3 py-1 text-[13px] rounded-xl ${selectedShoeType.includes(cat.id) ? 'bg-purple-600 text-white' : 'bg-slate-100'} `}>
                                #{cat.label}
                            </div>
                        ))}
                    </div>
                    <div onClick={handleRoute} className='text-lg bg-purple-600 text-white px-4 py-1 rounded-xl mt-8'>Next</div>
                </div>
            </div>


            <Navigation />
        </div>

    );
}

