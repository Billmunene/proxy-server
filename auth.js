const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000; // Port for the proxy server

// Your target API endpoint
const targetApiUrl = 'https://fedskillstest.coalitiontechnologies.workers.dev';

// Middleware to handle proxying requests
app.use('/api', createProxyMiddleware({
    target: targetApiUrl,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        // Prompt user for credentials and add Authorization header
        const username = req.headers['coalition'];
        const password = req.headers['skills-test'];
        if (username && password) {
            const authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
            proxyReq.setHeader('Authorization', authHeader);
        } else {
            res.status(400).send('Username and password are required.');
        }
    }
}));

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
