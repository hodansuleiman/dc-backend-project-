
//imports
require('dotenv').config();
const es5Render = require('express-es6-template-engine');
const es6Renderer = require('express-es6-template-engine');
const {setMainView, setNavs} = require('./utils'); // call it 
const express = require('express');
const navs = require('./data/navs.json')

const server = express();
const  PORT  = process.env.PORT || 8080;

server.engine('html', es6Renderer);// rendering files 
server.set('views', 'views'); //config we are telling the computer where to look
server.set('view engine', 'html');

//middleware
server.use(express.static(__dirname + '/public')); // .use is key word that will be used for middleware for every single file
server.use(express.json());


const authStatus = {
    isAuthenticated: false
};
//hard code creds
const validCreds = {
    password:'1234',
    username:'anna'
};

server.get('/', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs), // req.url is current Href
        partials: setMainView('landing')
    }); 
});

server.get('/about', (req,res) =>{
    console.log('pota', req.url);
    res.render('index', {
        locals: setNavs (req.url,navs), // req.url is current Href
        partials: setMainView('about')
    }); 
});

server.get('/gallery', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs), // req.url is current Href
        partials: setMainView('gallery')
    }); 
});

server.get('/heartbeat', (req, res) => {
    res.json({
        "is":"working",
        "status": "good"
    })
});

server.get('/login', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs), // req.url is current Href
        partials: setMainView('login')
    }); 
});

server.post('/login', (req,res) =>{  // server(post) is receiving what client puts in 
    const {password, username} = req.body;
    if (password === validCreds.password && username === validCreds.username) {
        authStatus.isAuthenticated =true;
    } else{
    authStatus.isAuthenticated =false;
    }
    res.json(authStatus); // send response 
});


server.get('/logout', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs), // req.url is current Href
        partials: setMainView('logout')
    }); 
});

server.get('/contact-us', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs), // req.url is current Href
        partials: setMainView('contact-us') // this line contact-us is the name of the file that is in the views directory
    }); 
});



server.get('/profile', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs), // req.url is current Href
        partials: setMainView('profile')
    }); 
});



server.listen(PORT, () => console.log(`The server is running at PORT ${PORT}.`))