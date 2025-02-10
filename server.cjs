const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(path.join(__dirname, 'about.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading about.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            fs.readFile('D:/Download/Mini Project/WP/api/products.json', (err, fileContent) => {
                const jsonData = err ? [] : JSON.parse(fileContent);
                jsonData.push(data);
                fs.writeFile('D:/Download/Mini Project/WP/api/products.json', JSON.stringify(jsonData, null, 2), err => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error saving data');
                    } else {
                        res.writeHead(200);
                        res.end('Data added successfully');
                    }
                });
            });
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));