import React, { useEffect, useState } from 'react';
import Food2Card from '../component/Food2Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import search1 from '../assets/search.png';
import useStore from '../zustand/store';

function Search() {
    const navigate = useNavigate();
    const { cart } = useStore();
    const { searchTerm } = useParams();
    const [query, setQuery] = useState(searchTerm || '');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);

                if (!response.ok) throw new Error('Search request failed');

                const data = await response.json();
                setResults(data.results);
                console.log(data.results);

            } catch (error) {
                setError('Error fetching search results');
                console.error('Error:', error);
            }
        };

        if (query) fetchData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);

            if (!response.ok) throw new Error('Search request failed');

            const data = await response.json();
            setResults(data.results);
            console.log(data.results);
            navigate(`/search/${encodeURIComponent(query)}`);
        } catch (error) {
            setError('Error fetching search results');
            console.error('Error:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className='h-screen bg-white'>
            <div className="flex justify-between px-5 pt-6 items-center">
                <button onClick={() => navigate(-1)} className="p-3 rounded-xl shadow-lg">
                    <FaArrowLeft className="text-xl" />
                </button>
                <div className="text-2xl font-semibold">Search</div>
                <Link to={'/cart'} className="p-3 relative rounded-xl shadow-lg">
                    <FaShoppingCart className='text-xl' />
                    {cart.length > 0 && (
                        <div className='absolute top-2 right-1 text-[9px] text-center w-4 h-4 p-1 flex items-center justify-center rounded-full text-white bg-red-600'>
                            {cart.length}
                        </div>
                    )}
                </Link>
            </div>
            <div className='mx-5 mt-4'>
                <div className="flex items-center w-full p-[2px] bg-white max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-md">
                    <input
                        type="text"
                        placeholder="Search for items"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown} // Trigger search on Enter
                        className="flex-grow px-4 py-2 focus:outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-3 py-2 bg-purple-500 text-white transition-colors rounded-lg"
                    >
                        <FontAwesomeIcon className='text-xl' icon={faSearch} />
                    </button>
                </div>
            </div>

            <div className="grid pt-5 grid-cols-2 h-[80vh] mx-1 overflow-auto gap-2 justify-between px-5">
                {results.length > 0 ? (
                    results.map((data) => (
                        <Food2Card key={data._id} data={data} />
                    ))
                ) : (
                    <div className='w-full flex flex-col ml-20 justify-center'>
                        <img src={search1} alt="" />
                        <div className='text-center'>No shoes Found with your search term</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
