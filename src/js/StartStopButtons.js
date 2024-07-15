import React, { useEffect, useState } from 'react';
import messages from './messages'; // Import messages
import { initializeRecognition } from './recognition'; // Adjust path as needed
import { setupEventListeners } from './eventListeners'; // Adjust path as needed

const StartStopButtons = ({ setFinalTranscript, language }) => {
    const [recognition, setRecognition] = useState(null);

    const handleStart = () => {
        console.log('Start button clicked');
        const rec = initializeRecognition(language);
        setRecognition(rec);
        setupEventListeners(rec, document.getElementById('start-btn'), document.getElementById('stop-btn'), document.getElementById('output'), document.getElementById('language-select'));
        rec.start();
    };

    const handleStop = async () => {
        if (recognition) {
            console.log('Stop button clicked');
            recognition.stop();
            // Handle final transcript saving logic here
        }
    };

    return (
        <div className="flex justify-between">
            <button id="start-btn" className="mx-2 py-2 px-6 bg-blue-500 text-white font-bold rounded" onClick={handleStart}>
                {messages[language].startBtn}
            </button>
            <button id="stop-btn" className="mx-2 py-2 px-6 bg-gray-300 text-white font-bold rounded" onClick={handleStop}>
                {messages[language].stopBtn}
            </button>
        </div>
    );
};

export default StartStopButtons;
