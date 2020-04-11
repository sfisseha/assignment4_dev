// import dependencies
const express = require('express');
var favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const bp = require("body-parser")

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');
const roomidHandler= require('./util/roomIdGenerator.js');
const data= require('./database.js');

const app = express();
const port = 8080;

app.use('/favicon.ico', express.static('images/favicon.ico'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bp.urlencoded({ extended: true })); //body parsers
app.use(bp.json());

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// TODO: Add server side code

// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.post('/', homeHandler.createRoom);

//renders corresponding room page
app.get('/:roomName', roomHandler.getRoom); 

//getting all previous messages
app.get('/:roomName/messages', roomHandler.getMessages); 

//adds a message for a given chatroom
app.post('/:roomName/messages', roomHandler.saveMessage);

// NOTE: This is the sample server.js code we provided, feel free to change the structures
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
