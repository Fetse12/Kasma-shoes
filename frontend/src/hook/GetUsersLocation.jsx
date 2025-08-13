import useStore from '../zustand/store';

export default function GetUsersLocation() {
    const { setUserLocation, setLocationError } = useStore();

    const UserLocation = () => {
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

    UserLocation()
}
