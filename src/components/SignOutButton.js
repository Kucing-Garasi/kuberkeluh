import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../js/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
