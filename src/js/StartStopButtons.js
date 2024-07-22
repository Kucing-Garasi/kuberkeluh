import React, { useEffect, useState } from 'react';
import { initializeRecognition } from './recognition'; // Adjust path as needed
import { setupEventListeners } from './eventListeners'; // Adjust path as needed
import Output from './Output';
import { getTranscript, saveTranscript } from './api';

const StartStopButtons = ({ transcript, setTranscript, language }) => {
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const rec = initializeRecognition(language);
        setRecognition(rec);

        setupEventListeners(
            rec,
            document.getElementById('toggle-mic'),
            document.getElementById('output'),
            document.getElementById('language-select'),
            setTranscript,
        );
    }, [])

    const handleSaveRecord = async () => {
        const resp = await saveTranscript(transcript.current, language);
        console.log("Save Success !!!", resp)
    }

    const handleGetRecord = async () => {
        const resp = await getTranscript();
        console.log("Get Success !!!", resp)
        document.getElementById('transcript').innerHTML = JSON.stringify(resp, null, 2);
    }

    return (
        <>
            <div className="flex justify-between">
                <button id="toggle-mic" className="mx-2 w-16 h-16 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z"></path>
                        <path d="M19 10h.01"></path>
                        <path d="M12 19v-2m0 0a4.978 4.978 0 0 0 4-1.066M12 17a4.978 4.978 0 0 1-4-1.066"></path>
                    </svg>
                </button>

                <button className="mx-2 py-2 px-6 bg-green-800 text-white font-bold rounded" onClick={handleSaveRecord}>
                    Save Record
                </button>
                <button className="mx-2 py-2 px-6 bg-pink-800 text-white font-bold rounded" onClick={handleGetRecord}>
                    Get Record
                </button>
            </div>
            <div className='w-1/2 my-4'>
                <Output output={""} />
            </div>

            <pre id='transcript'></pre>
        </>
    );
};

export default StartStopButtons;
