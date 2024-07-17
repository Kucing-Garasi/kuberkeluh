function formatText(text) {
    let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
        .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
        .replace(/^\*\s+/gm, "</li><li class='my-2'>") // List item
        .replace(/^(\* .*)/gm, "<ul class='my-2'><li class='my-2'>$1</li></ul>") // List start and end
        .replace(/^(\*\*)/gm, "<ul class='my-2'><li class='my-2'>") // List start
        .replace(/(\n\n)/g, "<br/></li></ul>") // List end
        .replace(/^(.+):$/gm, "<h2>$1</h2>") // Headers
        .replace(/(\n)/g, "<br>"); // Newline

    return formattedText.replace("<br></li></ul>", "</li></ul>");
}

export default formatText;
