// src/components/Navigation.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faMapMarkerAlt, faStore, faWrench } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();
    const activePath = location.pathname;

    return (
        <div className="fixed bottom-0 z-40 left-0 w-full bg-white text-gray-700 shadow-lg border-t border-gray-200">
            <div className="flex justify-around py-3">
                {/* Home */}
                <NavLink to="/" className="flex flex-col items-center">
                    <FontAwesomeIcon
                        icon={faHome}
                        className={`text-2xl transition-transform ${activePath === '/' ? 'text-purple-600 scale-110 shadow-lg' : 'text-gray-400'
                            }`}
                    />
                    <span
                        className={`text-xs mt-1 transition-colors ${activePath === '/' ? 'text-purple-600 font-semibold' : 'text-gray-400'
                            }`}
                    >
                        Home
                    </span>
                </NavLink>





                {/* Profile */}
                <NavLink to="/shoe" className="flex flex-col items-center">
                    <FontAwesomeIcon
                        icon={faStore}
                        className={`text-2xl transition-transform ${activePath === '/shoe' ? 'text-purple-500 scale-110 shadow-lg' : 'text-gray-400'
                            }`}
                    />
                    <span
                        className={`text-xs mt-1 transition-colors ${activePath === '/shoe' ? 'text-purple-500 font-semibold' : 'text-gray-400'
                            }`}
                    >
                        Shoe
                    </span>
                </NavLink>



                {/* Favorite */}
                <NavLink to="/getShoe/page1" className="flex flex-col items-center">
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={`text-2xl transition-transform ${activePath === '/getShoe/page1' || activePath === '/getShoe/page2' || activePath === '/getShoe/page3' || activePath === '/getShoe/page4' || activePath === '/getShoe' ? 'text-purple-500 scale-110 shadow-lg' : 'text-gray-400'
                            }`}
                    />
                    <span
                        className={`text-xs mt-1 transition-colors ${activePath === '/getShoe/page1' || activePath === '/getShoe/page2' || activePath === '/getShoe/page3' || activePath === '/getShoe/page4' || activePath === '/getShoe' ? 'text-purple-500 font-semibold' : 'text-gray-400'
                            }`}
                    >
                        Get Shoe
                    </span>
                </NavLink>

                <NavLink to="/customize" className="flex flex-col  items-center">
                    <FontAwesomeIcon
                        icon={faWrench}
                        className={`text-2xl transition-transform ${activePath === '/customize' ? 'text-purple-500 scale-110 shadow-lg' : 'text-gray-400'
                            }`}
                    />
                    <span
                        className={`text-xs mt-1 transition-colors ${activePath === '/customize' ? 'text-purple-500 font-semibold' : 'text-gray-400'
                            }`}
                    >
                        Custom
                    </span>
                </NavLink>
            </div>
        </div>
    );
};

export default Navigation;
