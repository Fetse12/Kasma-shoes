import React from 'react'
import deliver from '../assets/download.gif'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaBars } from 'react-icons/fa'

export default function Customized_Order() {

    return (
        <div className='h-screen bg-white'>
            <div className='flex px-5 pt-4 justify-between mb-4 items-center'>
                <Link to={'/'}><div className='p-3 rounded-xl shadow-lg'>
                    <FaArrowLeft className='text-xl' /></div></Link>
                <div className='text-2xl font-bold'>Succuss</div>
                <div className='p-3 rounded-xl shadow-lg'> <FaBars /></div>
            </div>
            <div className='text-4xl font-bold text-center mt-20 text-purple-600 '>We Will Find <div>Your Shoe</div></div>
            <img src={deliver} className='pt-6' alt="" />
            <div className='text-xl font-bold  text-center mt-5 text-purple-600 '> We Will Contact You With The Phone Number You Provided</div>
        </div>
    )
}