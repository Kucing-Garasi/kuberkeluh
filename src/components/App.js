import React, { useState } from 'react';
import LanguageSelect from './LanguageSelect';
import StartStopButtons from './StartStopButtons';
import Output from './Output';

const App = () => {
    const [language, setLanguage] = useState('id-ID');
    const [output, setOutput] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="my-2 text-3xl text-center">Kuberkeluh</h1>
            <LanguageSelect language={language} onChange={handleLanguageChange} />
            <StartStopButtons setFinalTranscript={setFinalTranscript} language={language} />
            <div id="output" className="output-area">
                {output} {/* Display the output here */}
            </div>
        </div>
    );
};

export default App;
