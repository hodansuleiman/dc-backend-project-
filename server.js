
//imports
require('dotenv').config();
const es5Render = require('express-es6-template-engine');
const es6Renderer = require('express-es6-template-engine');
const {setMainView} = require('./utils'); // call it 
const express = require('express');
const navs = require('./data/navs.json')

const server = express();
const  PORT  = process.env.PORT || 8080;

server.engine('html', es6Renderer);// rendering files 
server.set('views', 'views'); //config we are telling the computer where to look
server.set('view engine', 'html');

server.use(express.static(__dirname + '/public')); // .use is key word that will be used for middleware for every single file

server.get('/', (req,res) =>{
    res.render('index', {
        locals: {navs},
        partials: setMainView('landing')
    }); 
});

server.get('/about', (req,res) =>{
    res.render('index', {
        locals: {navs},
        partials: setMainView('about')
    }); 
});

server.get('/gallery', (req,res) =>{
    res.render('index', {
        locals: {navs},
        partials: setMainView('gallery')
    }); 
});

server.get('/contact-us', (req,res) =>{
    res.render('index', {
        locals: {navs},
        partials: setMainView('contact-us') // this line contact-us is the name of the file that is in the views directory
    }); 
});
server.get('/login', (req,res) =>{
    res.render('index', {
        locals: {navs},
        partials: setMainView('login')
    }); 
});

server.get('/logout', (req,res) =>{
    res.render('index', {
        locals: {navs},
        partials: setMainView('logout')
    }); 
});

server.get('/profile', (req,res) =>{
    res.render('index', {
        locals: {navs},
        partials: setMainView('profile')
    }); 
});

server.get('/heartbeat', (req, res) => {
    res.json({
        "is":"working",
        "status": "good"
    })
});

server.listen(PORT, () => console.log(`The server is running at PORT ${PORT}.`))