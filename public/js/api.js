async function saveTranscript(text, language) {
    const response = await fetch('/transcripts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, language })
    });

    if (!response.ok) {
        throw new Error('Failed to save transcript');
    }

    return response.json();
}
