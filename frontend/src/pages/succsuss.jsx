import React from 'react'
import deliver from '../assets/download.gif'
import { Link, useLocation } from 'react-router-dom'
import { FaArrowLeft, FaBars } from 'react-icons/fa'
import DistanceCalculator from '../hook/distanceTimeCalculator'
import useStore from '../zustand/store'

export default function Succsuss() {
    const location = useLocation()
    const data = location.state
    const start = { lat: 9.0192, lng: 38.7525 };
    const { userLocation } = useStore()

    return (
        <div className='min-h-screen bg-white'>
            <div className='flex px-5 pt-4 justify-between mb-4 items-center'>
                <Link to={'/'}><div className='p-3 rounded-xl shadow-lg'>
                    <FaArrowLeft className='text-xl' /></div></Link>
                <div className='text-2xl font-bold'>Succuss</div>
                <div className='p-3 rounded-xl shadow-lg'> <FaBars /></div>
            </div>
            <div className='text-4xl font-bold text-center mt-16 text-purple-600 '>Your Shoes are on <div>the way</div></div>
            <img src={deliver} className='pt-6' alt="" />

            <div className='px-10'>
                <div className='flex py-2 px-2  justify-between'>
                    <div>Name</div>
                    <div>{data.name}</div>
                </div>
                <div className='flex bg-slate-200 py-2 px-2 justify-between'>
                    <div>Phone</div>
                    <div>{data.phone}</div>
                </div>
                <div className='flex py-2  px-2 justify-between'>
                    <div>Adress</div>
                    <div>{data.address}</div>
                </div>
            </div>
            <div className='text-xl font-semibold text-center mt-10 px-4 text-purple-600 '>
                We will contact you with the phone number you provided
            </div>
            {/* <DistanceCalculator
                source={start}
                destination={userLocation}

            /> */}


        </div>
    )
}