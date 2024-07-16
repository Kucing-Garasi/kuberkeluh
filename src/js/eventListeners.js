import { saveTranscript } from './api'; // Adjust path as needed
import messages from './messages'; // Import messages for UI updates
import { updateButtonLabels } from './ui'; // Import updateButtonLabels for button text updates

function setupEventListeners(recognition, startBtn, stopBtn, output, languageSelect) {
    recognition.onstart = () => {
        output.textContent = messages[recognition.lang].listening;
    };
    
    recognition.onresult = (event) => {
        handleRecognitionResult(event, recognition.lang, output);
    };
    
    recognition.onerror = (event) => {
        output.textContent = messages[recognition.lang].error + ' ' + event.error;
    };
    
    recognition.onspeechend = () => {
        // Optional: Handle what happens when speech ends, if desired
    };

    startBtn.addEventListener('click', () => {
        handleStartClick(recognition, languageSelect.value, startBtn, stopBtn, output);
    });

    stopBtn.addEventListener('click', () => {
        handleStopClick(recognition, startBtn, stopBtn);
    });

    languageSelect.addEventListener('change', () => {
        handleLanguageChange(recognition, languageSelect, startBtn, stopBtn, output);
    });
}

function handleStartClick(recognition, language, startBtn, stopBtn, output) {
    console.log("start btn telah diklik")
    recognition.lang = language; // Set the language
    recognition.start(); // Start recognition

    console.log("Mencoba switch tombol")
    startBtn.disabled = true;
    startBtn.classList.add('bg-gray-300');
    startBtn.classList.remove('bg-blue-500');

    stopBtn.disabled = false;
    stopBtn.classList.remove('bg-gray-300');
    stopBtn.classList.add('bg-red-500');

    output.textContent = messages[language].listening; // Show listening message
}

function handleStopClick(recognition, startBtn, stopBtn) {
    recognition.stop();

    startBtn.disabled = false;
    startBtn.classList.remove('bg-gray-300');
    startBtn.classList.add('bg-blue-500');
    
    stopBtn.disabled = true;
    stopBtn.classList.add('bg-gray-300');
    stopBtn.classList.remove('bg-red-500');
}

function handleLanguageChange(recognition, languageSelect, startBtn, stopBtn, output) {
    recognition.lang = languageSelect.value;
    updateButtonLabels(languageSelect.value, startBtn, stopBtn);
    output.textContent = ''; // Clear the output when language changes
}

function handleRecognitionResult(event, language, output) {
    const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(' ');

    output.textContent = messages[language].youSaid + ' ' + transcript;
}

// Exporting all functions
export { setupEventListeners, handleStartClick, handleStopClick, handleLanguageChange, handleRecognitionResult };
