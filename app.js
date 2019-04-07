const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
var session = require('express-session');
const fileUpload = require('express-fileupload');


const {getHomePage, getTeamPage} = require('./routes/index');
const {addServicePage, addService, deleteService, editService, editServicePage} = require('./routes/service');
const {addEmployeePage, addEmployee, deleteEmployee, editEmployee, editEmployeePage} = require('./routes/team');
// const {addRecordPage, addRecord} = require('./routes/record');
const port = 2001;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'beauty'
});
// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;
//
// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app
// app.get('/login', function(request, response) {
// 	response.sendFile(path.join(__dirname + '/views/login.html'));
// });
// app.post('/auth', function(request, response) {
// 	var username = request.body.username;
// 	var password = request.body.password;
// 	if (username && password) {
//     console.log('SELECT * FROM Beauty.Managers WHERE employee_id = ? AND password = ?;', [username, password]);
// 		connection.query('SELECT * FROM Beauty.Managers WHERE employee_id = '+username+' AND password = '+password+';', function(error, results, fields) {
// 			if (results.length > 0) {
// 				request.session.loggedin = true;
// 				request.session.username = username;
// 				response.redirect('/');
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}			
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// });
app.get('/', getHomePage);
app.get('/team', getTeamPage);
app.get('/add', addServicePage);
app.get('/edit/:service_id', editServicePage);
app.get('/delete/:service_id', deleteService);
app.post('/add', addService);
app.post('/edit/:service_id', editService);
app.get('/adde', addEmployeePage);
app.get('/edite/:employee_id', editEmployeePage);
app.get('/deletee/:employee_id', deleteEmployee);
app.post('/adde', addEmployee);
app.post('/edite/:service_id', editEmployee);
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

// app.get('/addr', addRecordPage);
// app.post('/addr', addRecord);


// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
