import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import nahomIcon from '../assets/icon.png';
import useStore from '../zustand/store';

const MapComponent = () => {
    const { userLocation, locationError, setUserLocation, setLocationError } = useStore();
    const start = { lat: 9.0192, lng: 38.7525 };


    const GetUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        setLocationError("You need to allow location access to use this feature.");
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        setLocationError("Location information is unavailable.");
                    } else {
                        setLocationError("An unknown error occurred.");
                    }
                }
            );
        } else {
            setLocationError("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        if (!userLocation) {
            GetUserLocation()
        }
    }, []);

    // Custom hook to handle adding the routing control to the map
    function RoutingControl() {
        const map = useMap();

        useEffect(() => {
            if (!map || !userLocation) return; // Wait until the destination is available

            // Custom icon for the destination marker
            const destinationIcon = L.icon({
                iconUrl: nahomIcon,
                iconSize: [40, 45], // Adjust the size as needed
                iconAnchor: [16, 32], // Adjust the anchor as needed
            });

            // Initialize routing control with source and destination waypoints
            const routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(start.lat, start.lng), // Start point (static)
                    L.latLng(userLocation.lat, userLocation.lng), // Dynamic destination (user's location)
                ],
                routeWhileDragging: true,
                lineOptions: {
                    styles: [{ color: '#4fe64a', weight: 6 }],
                },
                createMarker: function (i, waypoint, n) {
                    const markerOptions = i === n - 1 ? { icon: destinationIcon } : { draggable: true };
                    return L.marker(waypoint.latLng, markerOptions);
                },
                show: false, // Initially hide the directions panel
            }).addTo(map);

            // Wait for the map to fully load and the markers to be added
            setTimeout(() => {
                // Calculate bounds to fit both the source and destination markers
                const bounds = L.latLngBounds([L.latLng(start.lat, start.lng), L.latLng(userLocation.lat, userLocation.lng)]);

                // Fit the map to these bounds with smooth animation
                map.fitBounds(bounds, {
                    padding: [50, 50], // Add padding for better visibility
                    animate: true,
                    duration: 3, // Set duration for the smooth zoom effect
                });
            }, 500); // Delay to ensure the markers are added before fitting bounds

            // Clean up routing control on unmount
            return () => map.removeControl(routingControl);
        }, [map, start, userLocation]);

        return null;
    }

    return (
        <div>
            {/* Prompt the user if location is not available */}
            {locationError && (
                <div style={{ color: 'red', textAlign: 'center', padding: '10px' }}>
                    {locationError}
                </div>
            )}

            {/* Show the map if location is available */}
            {userLocation ? (
                <MapContainer
                    center={[start.lat, start.lng]}
                    zoom={3} // Start with a zoom level showing a wider area
                    style={{ height: '100vh', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <RoutingControl />
                </MapContainer>
            ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <button onClick={GetUserLocation}>Enable Location</button>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
