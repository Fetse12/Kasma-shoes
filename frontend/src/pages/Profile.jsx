import React from 'react';
import Navigation from '../component/navigation';

export default function Profile() {
    const user = {
        name: 'John Doe',
        phoneNumber: '+123456789',
        telegramUsername: '@john_doe',
        email: 'johndoe@example.com',
        address: '123 Main St, Springfield',
        profilePicture: 'https://via.placeholder.com/150' // Placeholder image URL
    };

    return (
        <div className="flex flex-col justify-between h-screen bg-gray-100">
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold text-center mb-6">User Profile</h1>

                <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
                    <div className="flex flex-col items-center">
                        {/* Profile Picture */}
                        <img
                            src={user.profilePicture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300"
                        />

                        {/* User Info */}
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-gray-600">Phone: {user.phoneNumber}</p>
                        <p className="text-gray-600">Telegram: {user.telegramUsername}</p>
                        <p className="text-gray-600">Email: {user.email}</p>
                        <p className="text-gray-600">Address: {user.address}</p>
                    </div>
                </div>
            </div>

            <Navigation />
        </div>
    );
}
