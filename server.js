const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer();

server.on('request', (req, res) => {
    // Serve static files from the 'public' directory
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './public/index.html'; // Default to serving index.html
    } else {
        filePath = path.join(__dirname, 'public', req.url);
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404);
                res.end('404 Not Found');
                return
            } else {
                // Server error
                res.writeHead(500);
                res.end('Internal Server Error: ' + err.code);
                return
            }
        } else {
            // Success response
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
            return
        }
    });

    // if (req.url === '/' && req.method === 'GET') {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/plain');

    //     fs.readFile('./public/index.html', (err, data) => {
    //         if (err) {
    //             res.statusCode = 500;
    //             res.setHeader('Content-Type', 'text/plain');
    //             res.end('Internal Server Error');
    //         } else {
    //             res.statusCode = 200;
    //             res.setHeader('Content-Type', 'text/html');
    //             res.end(data);
    //         }
    //         return
    //     });
    // }
})

server.listen(port, 'localhost', () => {
    console.log(`Server running at http://localhost:${port}/`);
});
