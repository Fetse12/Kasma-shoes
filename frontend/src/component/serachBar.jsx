// src/components/SearchBar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if (searchTerm) {
            navigate(`/search/${searchTerm}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center w-full p-[2px] bg-white max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Trigger search on Enter
                className="flex-grow px-4 py-2 focus:outline-none"
            />
            <button
                onClick={handleSearch}
                className="px-3 py-2 bg-purple-500 text-white transition-colors rounded-lg"
            >
                <FontAwesomeIcon className="text-xl" icon={faSearch} />
            </button>
        </div>
    );
};

export default SearchBar;
