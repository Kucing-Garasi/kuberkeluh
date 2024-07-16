import React, { useState } from 'react';
import LanguageSelect from '../js/LanguageSelect';
import StartStopButtons from '../js/StartStopButtons';
import Output from '../js/Output';

const App = () => {
    const [language, setLanguage] = useState('id-ID');
    const [output, setOutput] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center mb-44">
            <div className="flex justify-center">
                <div className="w-1/2 text-center my-4 px-4">
                    <h2 className="text-3xl font-bold mb-4">Kuberkeluh</h2>
                    <p className="text-xl mb-2">
                        Kuberkeluh is an innovative platform designed to streamline feedback collection and analysis through advanced speech-to-text technology and AI-powered summarization.
                    </p>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-1/2  my-4">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2">
                            <h3 className="text-2xl font-semibold mt-4 mb-2">Our Mission</h3>
                            <p className="text-xl mb-2">
                                Our mission is to empower organizations to understand their users better, generate insightful reports, and take proactive actions based on comprehensive feedback summaries.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-2xl font-semibold mt-4 mb-2">Key Features</h3>
                            <ul className="text-xl list-disc list-inside">
                                <li>Speech-to-Text Conversion</li>
                                <li>AI-Powered Summarization</li>
                                <li>Detailed Report Generation</li>
                                <li>Actionable Suggestions</li>
                            </ul>
                        </div>
                    </div>


                    <div className="mt-4 flex justify-center">
                        <div className="">
                            <h3 className="text-2xl font-semibold mt-4 mb-2">How It Works</h3>
                            <ol className="text-xl list-decimal list-inside">
                                <li>Collect Feedback</li>
                                <li>Convert & Summarize</li>
                                <li>Generate Reports</li>
                                <li>Take Action</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <LanguageSelect language={language} onChange={handleLanguageChange} />
            <StartStopButtons setFinalTranscript={setFinalTranscript} language={language} />
        </div>
    );
};

export default App;
