'use client'
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [input, setInput] = useState("id-ID");
  const [buttons, setButtons] = useState({
    start: "Mulai Pengenalan Suara",
    stop: "Berhenti Pengenalan Suara"
  });
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    recognitionRef.current = initializeRecognition(input);

    recognitionRef.current.onresult = (event) => {
      handleRecognitionResult(event, input, setTranscript, setInterimTranscript);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, [input]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setInput(selectedLanguage);

    switch (selectedLanguage) {
      case "id-ID":
        setButtons({
          start: "Mulai Pengenalan Suara",
          stop: "Berhenti Pengenalan Suara"
        });
        break;
      case "en-US":
        setButtons({
          start: "Start Voice Recognition",
          stop: "Stop Voice Recognition"
        });
        break;
      case "ja-JP":
        setButtons({
          start: "音声認識を開始",
          stop: "音声認識を停止"
        });
        break;
      default:
        setButtons({
          start: "Mulai Pengenalan Suara",
          stop: "Berhenti Pengenalan Suara"
        });
        break;
    }
  };

  const handleStart = () => {
    setTranscript(""); // Clear the transcript on start
    setInterimTranscript(""); // Clear the interim transcript on start
    recognitionRef.current.start();
    setIsListening(true);
  };

  const handleStop = () => {
    recognitionRef.current.stop();
    setIsListening(false);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="my-2 text-3xl text-center">Kuberkeluh</h1>

        <select
          id="language-select"
          className="my-2 mx-2 px-4 py-1 border border-gray-300 rounded"
          onChange={handleLanguageChange}
        >
          <option value="id-ID">Bahasa Indonesia</option>
          <option value="en-US">English</option>
          <option value="ja-JP">日本語 (Japanese)</option>
        </select>

        <div className="flex justify-between">
          <button
            id="start-btn"
            className={`mx-2 py-2 px-6 ${isListening ? 'bg-gray-500' : 'bg-blue-500'} text-white font-bold rounded`}
            onClick={handleStart}
            disabled={isListening}
          >
            {buttons.start}
          </button>
          <button
            id="stop-btn"
            className={`mx-2 py-2 px-6 ${isListening ? 'bg-red-500' : 'bg-gray-300'} text-white font-bold rounded`}
            onClick={handleStop}
            disabled={!isListening}
          >
            {buttons.stop}
          </button>
        </div>

        <div id="transcript-output" className="mt-4 p-4 border border-gray-300 rounded">
          <div>{transcript}</div>
          <div style={{ color: 'gray' }}>{interimTranscript}</div>
        </div>
      </div>
    </div>
  );
}

function initializeRecognition(language) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = language;
  recognition.continuous = true;
  recognition.interimResults = true;

  return recognition;
}

async function handleRecognitionResult(event, lang, setTranscript, setInterimTranscript) {
  let interimTranscript = '';
  let finalTranscript = '';

  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript + ' ';
    } else {
      interimTranscript += transcript;
    }
  }

  setInterimTranscript(interimTranscript);
  setTranscript((prev) => prev + finalTranscript);

  // Save the final transcript to the server
  if (finalTranscript.trim().length > 0) {
    try {
      const savedTranscript = await saveTranscript(finalTranscript.trim(), lang);
      console.log('Saved transcript:', savedTranscript);
    } catch (error) {
      console.error('Error saving transcript:', error);
    }
  }
}

async function saveTranscript(transcript, lang) {
  // Implement the function to save the transcript to your database
  console.log('Saving transcript:', transcript, 'Language:', lang);
  // Replace this with your actual saving logic
  return Promise.resolve({ transcript, lang });
}
