const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const helmet = require('helmet');

const app = express();

const port = 3000;



const options = {
  // Replace with your own certificate and key paths
  cert: fs.readFileSync(path.join(__dirname, "cert", 'cert.pem')),
  key: fs.readFileSync(path.join(__dirname, "cert",'key.pem')),
};

// Serve static React app files from build folder
app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist'), {
    cacheControl: true,
    maxAge: 5 * 60 * 1000 // miliseconds, 5 minutes
}));

app.use(helmet());

// Proxy API requests (adjust url as needed)
// app.use('/api', require('http-proxy-middleware')({ target: 'http://localhost:5000' }));

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});