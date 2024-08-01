import React from 'react';
import SignOutButton from './SignOutButton';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome, Pengguna Baru!</h1>
            <p className="text-lg text-gray-600 mb-8">
                Anda telah berhasil masuk ke aplikasi Kuberkeluh.
            </p>

            <div className="flex space-x-4">
                <Link to="/" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
                    Back to Landing Page
                </Link>

                <SignOutButton />
            </div>
        </div>
    );
};

export default Welcome;
