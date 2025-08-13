import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useStore from '../zustand/store'
import Food2Card from '../component/Food2Card'
import { FaBars, FaShoppingCart, FaTimes } from 'react-icons/fa'
import SideBar from '../component/SideBar'
import Navigation from '../component/navigation'

export default function TypeShoe() {
    const [menuOpen, setMenuOpen] = useState(false);

    const { shoes, cart } = useStore();
    const location = useLocation()

    const data = location.state
    let filteredShoes = []
    if (data.isShoeType) {
        filteredShoes = shoes.filter((shoe) => shoe.shoes_type === data.type)
    } else {
        filteredShoes = shoes.filter((shoe) => shoe.type === data.type)
    }

    return (
        <div className='bg-white'>
            {menuOpen && <SideBar setMenuOpen={setMenuOpen} />}
            <div className='flex  justify-between px-5 items-center'>
                <div className='text-2xl flex items-center gap-3  font-bold text-purple-600 mb-4 mt-5'>
                    {menuOpen ? <FaTimes onClick={() => setMenuOpen(false)} className='text-xl  z-50 text-red-600' /> : <FaBars onClick={() => setMenuOpen(true)} className='text-xl text-black' />}
                    {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
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
            <div className="grid pt-5 grid-cols-2 h-[83vh] mx-1 text-black overflow-auto gap-2 justify-between px-5">

                {filteredShoes ? filteredShoes.map((data) => (
                    <Food2Card key={data._id} data={data} />
                )) : 'No Shoe Found'}
            </div>

            <Navigation />

        </div>

    )
}
