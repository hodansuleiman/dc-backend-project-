
//imports
require('dotenv').config();
const es5Render = require('express-es6-template-engine');
const express = require('express');
const es6Renderer = require('express-es6-template-engine');

const server = express();
const  PORT  = process.env.PORT || 8080;

server.engine('html', es6Renderer);// rendering files 
server.set('views', 'views'); //config we are telling the computer where to look
server.set('view engine', 'html');

server.use(express.static(__dirname + '/public')); // .use is key word that will be used for middleware for every single file

server.get('/', (req,res) =>{
    res.render('index'); //pulling index
})

server.get('/heartbeat', (req, res) => {
    res.json({
        "is":"working",
        "status": "good"
    })
});

server.listen(PORT, () => console.log(`The server is running at PORT ${PORT}.`))