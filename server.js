
//import dependencies
require('dotenv').config();
const cookieParser = require('cookie-parser');
const es6Renderer = require('express-es6-template-engine');
const express = require('express');
const sessions = require('express-session');

//import modules bring in named module export 
const {checkAuth} = require('./middleware');
const {setMainView, setNavs} = require('./utils'); // call it 

const navs = require('./data/navs.json')

//import
const server = express();
const  PORT  = process.env.PORT || 8080;

// setting up - we dont touch this all the time 
server.engine('html', es6Renderer);// rendering files 
server.set('views', 'views'); //config we are telling the computer where to look
server.set('view engine', 'html');

//middleware
server.use(express.static(__dirname + '/public')); // .use is key word that will be used for middleware for every single file
server.use(express.json());
server.use(cookieParser());
server.use(sessions ({ //settings for sessions
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: {maxAge: 30000}, //forcing into expiry after 30 secs locked out
    resave:false
}))


//hard code creds
const validCreds = {
    password:'1234',
    username:'anna'
};

server.get('/', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('login')
    }); 
});

server.get("/landing", (req, res) => {
    res.render("index", {
      locals: setNavs(req.url, navs, !!req.session.userId),
  
      partials: setMainView("landing"),
    });
  });

server.get('/management', (req,res) =>{
    console.log('pota', req.url);
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('management')
    }); 
});

server.get('/about', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('about')
    }); 
});

server.get('/clients', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('clients')
    }); 
});

server.get('/booking', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        bookingId: req.query.id,
        partials: setMainView('booking')
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
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('login'),
});
});
server.post('/login', (req,res) =>{  // server(post) is receiving what client puts in 
    const afterLogin ={
        isAuthenticated:false,
        redirectTo: '/login'
    };
    const {password, username} = req.body;
    console.log(username,password)
    if (password === validCreds.password && username === validCreds.username) {
        req.session.userId=username;
        afterLogin.isAuthenticated = true;
        afterLogin.redirectTo='/profile';
    } 
    res.json(afterLogin); // send response 
});

server.get('/register', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('register'),
});
});

server.post('/register', async (req, res) => {
    const { groupType, firstName, lastName, email, password, confirmPassword } = req.body;
    
    // Create new user in the database
    const newUser = await User.create({
      groupType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    });
  
    res.send({
      message: `User with id ${newUser.id} has been created`
    });
  });
  
  
server.get('/logout', (req,res) =>{
   req.session.destroy();
   res.redirect('/');
});


server.get('/profile', checkAuth, (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url, navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('profile')
    }); 
});


server.get('/vendors', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('vendors') // this line contact-us is the name of the file that is in the views directory
    }); 
});







server.listen(PORT, () => console.log(`The server is running at PORT ${PORT}.`))