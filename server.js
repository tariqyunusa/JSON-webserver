const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const WebSocket = require('ws');
const users = require('./users.js'); 

const generateId = () => users.length ? users[users.length - 1].id + 1: 1

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let filePath = path.join(__dirname, 'public', parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);

    // Set content type based on file extension
    const ext = path.extname(filePath);
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
    };
    const contentType = contentTypes[ext] || 'text/plain';

    // get users
    if (parsedUrl.pathname === '/api/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
        return;
    }
    // create user 
    if(parsedUrl.pathname === '/api/users' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            try{
                const newUser = JSON.parse(body)
                newUser.id = generateId()
                users.push(newUser)
                res.writeHead(201, {'Content-Type' : 'application/json'})
                res.end(JSON.stringify({message: 'user added', user: newUser}))
            }catch(error) {
                res.writeHead(400, { 'Content-Type' : 'application/json'})
                res.end(JSON.stringify({error: 'Invalid JSON'}))
            }
        })
        return
    }

    // update user
    if (parsedUrl.pathname.startsWith('/api/users/') && req.method === 'PUT') {
        const userId = parseInt(parsedUrl.pathname.split('/').pop());
    
        if (isNaN(userId)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid user ID' }));
            return;
        }
    
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            try {
                if (!body) throw new Error('Empty request body');
    
                const updatedData = JSON.parse(body);
                const userIndex = users.findIndex(user => user.id === userId);
    
                if (userIndex === -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'User not found' }));
                    return;
                }
    
                users[userIndex] = { ...users[userIndex], ...updatedData };
    
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User updated', user: users[userIndex] }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    
        return;
    }
    
    // Delete User
    if (parsedUrl.pathname.startsWith('/api/users/') && req.method === 'DELETE') {
        const userId = parseInt(parsedUrl.pathname.split('/').pop());
    
        if (isNaN(userId)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid user ID' }));
            return;
        }
    
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'User not found' }));
            return;
        }
    
        const deletedUser = users.splice(userIndex, 1)[0]; // Remove and store deleted user
    
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User deleted', user: deletedUser }));
        return;
    }
    

    // Serve static files
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - File Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.send('Welcome to the WebSocket Server!');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => console.log('Client disconnected'));
});

// Start server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
