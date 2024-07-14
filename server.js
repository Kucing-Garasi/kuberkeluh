const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;  // Use environment variable for port

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,  // Added for better connection management
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema and Model
const transcriptSchema = new mongoose.Schema({
  text: String,
  language: String,
  createdAt: { type: Date, default: Date.now }
});

const Transcript = mongoose.model('Transcript', transcriptSchema);

// API endpoint to save transcript
app.post('/transcripts', async (req, res) => {
  const { text, language } = req.body;
  const newTranscript = new Transcript({ text, language });
  try {
    await newTranscript.save();
    res.status(201).send(newTranscript);
  } catch (err) {
    res.status(400).send({ error: 'Error saving transcript', details: err });
  }
});

// Serve static files
app.get('*', (req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

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
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('Internal Server Error: ' + err.message);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Create HTTP server
const server = http.createServer(app);

server.listen(port, 'localhost', () => {
  console.log(`Server running at http://localhost:${port}/`);
});
