function setupEventListeners(recognition, startBtn, stopBtn, output, languageSelect) {
    recognition.onstart = () => {
        output.textContent = messages[recognition.lang].listening;
    };

    recognition.onspeechend = () => {
        // Do not stop the recognition on speech end
    };

    recognition.onresult = (event) => {
        handleRecognitionResult(event, recognition.lang, output);
    };

    recognition.onerror = (event) => {
        output.textContent = messages[recognition.lang].error + ' ' + event.error;
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
    recognition.lang = language;
    recognition.start();

    startBtn.disabled = true;
    startBtn.classList.add('bg-gray-300');
    startBtn.classList.remove('bg-blue-500');

    stopBtn.disabled = false;
    stopBtn.classList.remove('bg-gray-300');
    stopBtn.classList.add('bg-red-500');

    output.textContent = messages[language].listening;
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
    output.textContent = '';
}
