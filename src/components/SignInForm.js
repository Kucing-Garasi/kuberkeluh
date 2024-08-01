// import firebase from "firebase/app";
import React, { useEffect } from "react";
import { auth } from "../js/firebaseConfig.js";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function SignInForm() {
    const navigate = useNavigate();

    useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

        const uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    window.alert("Sign-in Success!")
                    navigate('/welcome');
                    return true;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            // signInSuccessUrl: '/welcome',
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    scopes: [
                        'https://www.googleapis.com/auth/userinfo.email',
                        'https://www.googleapis.com/auth/userinfo.profile',
                    ],
                    customParameters: {
                        // Forces account selection even when one account is available.
                        prompt: 'select_account'
                    }
                },
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true,
                }
            ]
            // Terms of service url.
            // tosUrl: '<your-tos-url>',
            // Privacy policy url.
            // privacyPolicyUrl: '<your-privacy-policy-url>'
        };

        ui.start('#firebaseui-auth-container', uiConfig);

        return () => {
            ui.reset();
        };
    }, [])

    return <>
        <div
            className="flex items-center justify-center min-h-screen object-contain bg-cover bg-center"
            style={{ backgroundImage: `url(https://cdn.imgchest.com/files/84apcd9pnv4.png)` }}
        >
            <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In to Kuberkeluh</h2>

                <div className="flex flex-col justify-center items-center">
                    <div id="firebaseui-auth-container"></div>
                    <div id="loader">Loading...</div>
                    <Link to="/" className="mt-4 hover:text-blue-800 text-md underline">Back to Landing Page</Link>
                </div>
            </div>
        </div>
    </>
}

export default SignInForm;
