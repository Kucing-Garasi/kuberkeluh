import messages from './messages.js'; // Import the messages object
import { saveTranscript } from './api.js'; // Import the saveTranscript function

function initializeRecognition(language) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;

    return recognition;
}

async function handleRecognitionResult(event, lang, output) {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
        } else {
            interimTranscript += transcript;
        }
    }

    output.innerHTML = messages[lang].youSaid + ' <strong>' + finalTranscript + '</strong><br><em>' + interimTranscript + '</em>';

    // Save the final transcript to the server when the stop button is clicked
    if (finalTranscript.trim().length > 0) {
        try {
            const savedTranscript = await saveTranscript(finalTranscript.trim(), lang);
            console.log('Saved transcript:', savedTranscript);
        } catch (error) {
            console.error('Error saving transcript:', error);
        }
    }
}

export { initializeRecognition, handleRecognitionResult }; // Export the functions
