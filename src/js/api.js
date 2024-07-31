export async function saveTranscript(text, language) {
    const json = JSON.stringify({ text, language });
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/transcripts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    });

    if (!response.ok) {
        throw new Error('Failed to save transcript');
    }

    return response.json();
}

export async function getTranscript() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/transcripts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to save transcript');
    }

    return response.json();
}
