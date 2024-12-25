const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript', 
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.JPG': 'image/jpeg',  // Add uppercase extension
    '.PNG': 'image/png'    // Add uppercase extension
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Decode the URL to handle spaces and special characters
    let filePath = decodeURIComponent(req.url);
    
    // Remove query parameters if present
    filePath = filePath.split('?')[0];

    // If requesting root, serve index.html
    if (filePath === '/') {
        filePath = '/index.html';
    }

    // Construct full file path
    filePath = path.join(__dirname, filePath);

    // Get file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log(`Serving files from: ${__dirname}`);
});