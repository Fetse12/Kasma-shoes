import React, { useEffect, useState } from 'react';
import burger from '../assets/burgur.png';
import injera from '../assets/injera.png';
import snickers from '../assets/snickers.png'
import fromal from '../assets/formal.png'
import boots from '../assets/boots.png'
import heels from '../assets/heels.png'
import athletic from '../assets/athletic.png'
import flipflop from '../assets/flipflop.png'
import loafers from '../assets/loafers.png'
import work from '../assets/work.png'
import running from '../assets/running.png'

export default function Category({ HandeleShoeType }) {
    const [selected, setSelected] = useState(() => {
        return JSON.parse(localStorage.getItem('selectedCatagory')) || 'sneakers';
    });

    const categories = [
        { id: 'sneakers', label: 'Sneakers', img: snickers },
        { id: 'boots', label: 'Boots', img: boots },
        { id: 'formal_shoes', label: 'Formal', img: fromal },
        { id: 'heels', label: 'Heels', img: heels },
        { id: 'athletic_shoes', label: 'Athletic', img: athletic },
        { id: 'flip_flops', label: 'Flip-Flops', img: flipflop },
        { id: 'sandals', label: 'Sandals', img: loafers },
        { id: 'running_shoes', label: 'Running', img: running },
    ];

    useEffect(() => {
        const label = categories.find(category => category.id === selected);
        HandeleShoeType(label.id);
    }, [selected, HandeleShoeType]); // Update effect dependency

    const handleCategorySelect = (category) => {
        setSelected(category.id);
        HandeleShoeType(category.id);
        localStorage.setItem('selectedCatagory', JSON.stringify(category.id));
    };

    return (
        <div>
            {/* Category Scrollable List */}
            <div className="w-full overflow-x-auto py-2 pl-5 flex gap-3 pr-3 scrollbar-hide snap-x snap-mandatory">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => handleCategorySelect(category)} // Use separate function
                        className={`flex py-3 flex-col flex-none gap-1 items-center rounded-full 
                            ${selected === category.id ? 'bg-purple-600' : ''} 
                            p-2 cursor-pointer snap-center transition-all`}
                    >
                        <div className={`p-1 rounded-full ${selected === category.id ? 'bg-white' : ''}`}>
                            <img className='w-14 h-12 object-cover' src={category.img} alt={category.label} />
                        </div>
                        <div className={`text-sm ${selected === category.id ? 'text-white' : ''} font-medium`}>{category.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
