function initializeRecognition(language) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;

    return recognition;
}


export { initializeRecognition }; // Export the functions
