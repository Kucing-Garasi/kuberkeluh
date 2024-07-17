import React, { useEffect, useState } from 'react';
import messages from './messages'; // Import messages
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
            document.getElementById('start-btn'),
            document.getElementById('stop-btn'),
            document.getElementById('output'),
            document.getElementById('language-select'),
            setTranscript,
        );
    }, [])

    const handleSaveRecord = async () => {
        const resp = await saveTranscript(transcript, language);
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
                <button id="start-btn" className="mx-2 py-2 px-6 bg-blue-500 text-white font-bold rounded">
                    {messages[language].startBtn}
                </button>
                <button id="stop-btn" className="mx-2 py-2 px-6 bg-gray-300 text-white font-bold rounded">
                    {messages[language].stopBtn}
                </button>
                <button id="stop-btn" className="mx-2 py-2 px-6 bg-green-800 text-white font-bold rounded" onClick={handleSaveRecord}>
                    Save Record
                </button>
                <button id="stop-btn" className="mx-2 py-2 px-6 bg-pink-800 text-white font-bold rounded" onClick={handleGetRecord}>
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
