document.addEventListener('DOMContentLoaded', init);

function init() {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const output = document.getElementById('output');
    const languageSelect = document.getElementById('language-select');

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Browser Anda tidak mendukung Web Speech API.');
        return;
    }

    const recognition = initializeRecognition(languageSelect.value);
    setupEventListeners(recognition, startBtn, stopBtn, output, languageSelect);
    updateButtonLabels(languageSelect.value, startBtn, stopBtn);
}
