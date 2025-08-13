import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';
import Food2Card from './Food2Card'; // Ensure this path is correct

const Carousel = ({ componentCards }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const cardsPerPage = 4;
    const totalPages = Math.ceil(componentCards.length / cardsPerPage);


    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const currentCards = componentCards.slice(
        currentPage * cardsPerPage,
        (currentPage + 1) * cardsPerPage
    );

    const handlers = useSwipeable({
        onSwipedLeft: handleNext, // Swipe left to go to the next page
        onSwipedRight: handlePrev, // Swipe right to go to the previous page
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <div className="flex flex-col items-center" {...handlers}>
            <div className="grid grid-cols-2 w-full px-3 gap-2 transition-transform duration-500">
                {currentCards.map((card, index) => (
                    <div key={card._id || index}>
                        <Food2Card data={card} />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Carousel;
