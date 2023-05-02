require('dotenv').config();
const express = require('express');

const server = express();

const  PORT  = process.env.PORT || 8080;

server.get('/heartbeat', (req, res) => {
    res.json({
        "is":"working"
    })
});

server.listen(PORT, () => console.log(`The server is running at PORT ${PORT}.`))