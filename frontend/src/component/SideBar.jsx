import React from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';

export default function SideBar({ setMenuOpen }) {
    const { selected, setSelected } = useStore();
    const navigate = useNavigate();

    const handleNavigation = (type) => {
        setMenuOpen(false);
        navigate('/shoeType', { state: { isShoeType: type === 'men' || type === 'women', type } });
        setSelected(type);
    };

    const getMenuItemClass = (type) => {
        return selected === type ? 'bg-gray-200' : '';
    };

    return (
        <div className={`w-64 h-screen bg-white shadow-lg z-40 fixed top-0 left-0 transition-transform transform`}>
            <div className="flex justify-between items-center ml-8 mt-1 p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">ጫማ</h2>
            </div>
            <nav className="mt-4 px-5">
                <div>
                    {['men', 'women', 'kids', 'formal_shoes', 'sneakers', 'boots', 'athletic_shoes', 'heels'].map((type) => (
                        <div
                            key={type}
                            onClick={() => handleNavigation(type)}
                            className={`p-2 ${getMenuItemClass(type)} flex justify-between py-3 items-center ${type !== 'heels' ? 'border-b-[1px] border-gray-500' : ''} hover:bg-gray-100`}
                        >
                            <div className="text-gray-800 text-xl">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                            <div><MdKeyboardArrowDown className='text-2xl' /></div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
}
