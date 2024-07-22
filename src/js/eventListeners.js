import messages from './messages'; // Import messages for UI updates
import { updateButtonLabels } from './ui'; // Import updateButtonLabels for button text updates

function setupEventListeners(recognition, toggleMic, startBtn, stopBtn, output, languageSelect, setTranscript) {
    recognition.onstart = () => {
        output.textContent = messages[recognition.lang].listening;
    };

    recognition.onresult = (event) => {
        handleRecognitionResult(event, recognition.lang, output, setTranscript);
    };

    recognition.onerror = (event) => {
        output.textContent = messages[recognition.lang].error + ' ' + event.error;
    };

    recognition.onspeechend = () => {
        // Optional: Handle what happens when speech ends, if desired
    };

    toggleMic.addEventListener('click', () => {
        console.log('toggleMic clicked');
        toggleMicStartStop(recognition, languageSelect.value, toggleMic, output);
    });

    languageSelect.addEventListener('change', () => {
        handleLanguageChange(recognition, languageSelect, startBtn, stopBtn, output);
    });
}

let isRecognizing = false; // Add a flag to track recognition state

function toggleMicStartStop(recognition, language, toggleMic, output) {
    if (isRecognizing) {
        // Stop recognition if it's already running
        recognition.stop();
        toggleMic.classList.remove('bg-red-500');
        toggleMic.classList.add('bg-blue-500');

        isRecognizing = false; // Update the flag
    } else {
        // Start recognition if it's not running
        recognition.lang = language; // Set the language
        recognition.start(); // Start recognition
        toggleMic.classList.add('bg-red-500'); // Change the color of the button
        toggleMic.classList.remove('bg-blue-500');
        output.textContent = messages[language].listening; // Show listening message

        isRecognizing = true; // Update the flag
    }
}

function handleLanguageChange(recognition, languageSelect, startBtn, stopBtn, output) {
    recognition.lang = languageSelect.value;
    updateButtonLabels(languageSelect.value, startBtn, stopBtn);
    output.textContent = ''; // Clear the output when language changes
}

function handleRecognitionResult(event, language, output, setTranscript) {
    const text = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(' ');

    setTranscript(text);

    output.textContent = messages[language].youSaid + ' ' + text;
}

// Exporting all functions
export {
    setupEventListeners,
    handleLanguageChange,
    handleRecognitionResult
};
