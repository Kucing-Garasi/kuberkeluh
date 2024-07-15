import messages from './messages.js'; // Import the messages object

function updateButtonLabels(language, startBtn, stopBtn) {
    startBtn.textContent = messages[language].startBtn;
    stopBtn.textContent = messages[language].stopBtn;
}

export { updateButtonLabels }; // Export the function
