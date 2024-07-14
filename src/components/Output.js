import React from 'react';

const Output = ({ output, finalTranscript }) => {
    return (
        <div className="output-container mt-4">
            <h2 className="text-xl">Output:</h2>
            <p>{finalTranscript || output || "No output yet."}</p>
        </div>
    );
};

export default Output;
