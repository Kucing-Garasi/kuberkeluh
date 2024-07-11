const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        // res.end('Hello, world!');
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }
})

server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
});
