export async function saveTranscript(text, language) {
    const json = JSON.stringify({ text, language });
    // TODO: change the URI to be loaded from env OR just adjust it to the correct one for dev
    const response = await fetch('https://didactic-space-goggles-65rgxwr94vxc4w67-3001.app.github.dev/transcripts', {
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
    // TODO: change the URI to be loaded from env OR just adjust it to the correct one for dev
    const response = await fetch('https://didactic-space-goggles-65rgxwr94vxc4w67-3001.app.github.dev/transcripts', {
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
