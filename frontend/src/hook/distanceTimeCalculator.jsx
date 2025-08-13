
// DistanceCalculator.js
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';

const DistanceCalculator = ({ source, destination }) => {
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        if (!source || !destination) return;

        // Initialize routing control without map integration
        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(source.lat, source.lng),
                L.latLng(destination.lat, destination.lng),
            ],
            createMarker: () => null,  // Don't add markers for this calculation
            routeWhileDragging: false,
        });

        routingControl.on('routesfound', (e) => {
            const route = e.routes[0];
            const calculatedDistance = route.summary.totalDistance; // in meters
            const calculatedDuration = route.summary.totalTime; // in seconds

            // Convert distance and time to human-readable formats
            const formattedDistance = calculatedDistance >= 1000
                ? `${(calculatedDistance / 1000).toFixed(2)} km`
                : `${calculatedDistance.toFixed(2)} m`;

            const formattedDuration = calculatedDuration >= 3600
                ? `${(calculatedDuration / 3600).toFixed(2)} hrs`
                : `${(calculatedDuration / 60).toFixed(2)} mins`;

            setDistance(formattedDistance);
            setDuration(formattedDuration);

            // Call the onCalculate callback if provided
            if (onCalculate) {
                onCalculate({ distance: formattedDistance, duration: formattedDuration });
            }
        });

        routingControl.route();

        // Clean up by removing the routing control instance
        return () => routingControl.getPlan().setWaypoints([]);
    }, [source, destination]);

    return (
        <div className='flex px-8 w-full justify-center gap-5'>
            {distance && duration ? (
                <>
                    <div className='rounded-2xl p-4 shadow-xl'>
                        <div className='text-xl text-semiBold'>Total distance:</div>
                        <div className='text-purple-600 font-bold text-xl'>{distance}</div>
                    </div>
                    <div className='rounded-2xl p-4 shadow-xl'>

                        <div className='text-xl text-semiBold'>Estimated Time:</div>
                        <div className='text-purple-600 font-bold text-xl'> {duration}</div>
                    </div></>

            ) : (
                <p>Calculating route...</p>
            )}
        </div>
    );
};

export default DistanceCalculator;
