var port = parseInt(process.argv[2]);
var express = require('express');
var app = express();
// app.disable('etag');

// http://www.sqlitetutorial.net/sqlite-nodejs/connect/
const sqlite3 = require('sqlite3').verbose();

// https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// http://www.sqlitetutorial.net/sqlite-nodejs/connect/
// https://github.com/mapbox/node-sqlite3/wiki/API
// will create the db if it does not exist
var db = new sqlite3.Database('db/database.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the database.');
});

// https://expressjs.com/en/starter/static-files.html
app.use(express.static('static-content')); 

function isEmptyObject(obj){
	return Object.keys(obj).length === 0;
}

app.post('/api/login', function (req, res) {
	var user = req.body.user;
	var password = req.body.password;

	var result = { "error": {} , "success":false};
	if(user==""){
		result["error"]["user"]="User not supplied";
	}
	if(password==""){
		result["error"]["password"]="Password not supplied";
	}
	if(isEmptyObject(result["error"])){
		let sql = 'SELECT * FROM user WHERE user=? and password=?;';
		db.get(sql, [user, password], function (err, row){
  			if (err) {
				res.status(500); 
    				result["error"]["db"] = err.message;
  			} else if (row) {
				res.status(200);
				result.success = true;
			} else {
				res.status(401);
				result.success = false;
    				result["error"]["login"] = "Login failed";
			}
			res.json(result);
		});
	} else {
		res.status(400);
		res.json(result);
	}
});


function validateUser(data){
	result = {};

	var user = data.user;
	var password = data.password;
	var confirmpassword = data.confirmpassword;
	var bday = data.bday;

	if(!user || user==""){
		result["user"]="User not supplied";
	}
	if(!password || password==""){
		result["password"]="Password not supplied";
	}
	if(!confirmpassword || password!=confirmpassword){
		result["confirmpassword"]="Passwords do not match ";
	}
	if(!bday || bday==""){
		result["bday"]="Birthday not supplied";
	}
	return result;
}

// Create a new user
app.post('/api/user/:user', function (req, res) {
	var result = { error: validateUser(req.body) , success:false};
	if(isEmptyObject(result["error"])){
		let sql = 'INSERT INTO user '+
			'(user, password, bday) ' +
			' VALUES(?,?,?);';
		let d = req.body;
		let params = [d.user, d.password, d.bday];

		db.run(sql, params, function (err){
  			if (err) {
				res.status(500); 
    				result["error"]["db"] = err.message;
  			} else {
				if(this.changes!=1){
    					result["error"]["db"] = "Not updated";
					res.status(404);
				} else {
					res.status(200);
					result.success = true;
				}
			}
			res.json(result);
		});
	} else {
		res.status(400);
		res.json(result);
	}
});

// Update user
app.put('/api/user/:user', function (req, res) {
	var result = { error: validateUser(req.body) , success:false};
	if(isEmptyObject(result["error"])){
		let sql = 'UPDATE user SET '+
			' password=?, bday=?' +
			' WHERE user=? AND password=?;';
		let d = req.body;
		let params = [d.password, d.bday, d.user, d.confirmpassword];

		db.run(sql, params, function (err){
  			if (err) {
				res.status(500); 
    				result["error"]["db"] = err.message;
  			} else {
				if(this.changes!=1){
    					result["error"]["db"] = "Not updated";
					res.status(404);
				} else {
					res.status(200);
					result.success = true;
				}
			}
			res.json(result);
		});
	} else {
		res.status(400);
		res.json(result);
	}
});

app.get('/api/user/:user', function (req, res) {
	// console.log(JSON.stringify(req));
	// var user = req.body.user;
	// var password = req.body.password;

	var user = req.params.user;
	//var password = req.query.password;

	var result = { error: {} , success:false};
	if(user==""){
		result["error"]["user"]="User not supplied";
	}
	/*
	if(password==""){
		result["error"]["password"]="Password not supplied";
	}
	*/
	if(isEmptyObject(result["error"])){
		let sql = 'SELECT * FROM user WHERE user=?;';
		db.get(sql, [user], function (err, row){
  			if (err) {
				res.status(500); 
    				result["error"]["db"] = err.message;
  			} else if (row) {
				res.status(200);
				result.data = row;
				result.success = true;
			} else {
				res.status(401);
				result.success = false;
    				result["error"]["login"] = "Login failed";
			}
			res.json(result);
		});
	} else {
		res.status(400);
		res.json(result);
	}
});

app.get('/api/user/:user/stats', function (req, res) {
	// console.log(JSON.stringify(req));
	// var user = req.body.user;
	// var password = req.body.password;

	var user = req.params.user;

	var result = { error: {} , success:false};
	if(user==""){
		result["error"]["user"]="User not supplied";
	}
	if(isEmptyObject(result["error"])){
		let sql = 'SELECT * FROM score WHERE username=?;';
		db.get(sql, [user], function (err, row){
  			if (err) {
				res.status(500); 
    				result["error"]["db"] = err.message;
  			} else if (row) {
				res.status(200);
				result.data = row;
				result.success = true;
			} else {
				res.status(401);
				result.success = false;
    				result["error"]["login"] = "No scores recorded";
			}
			res.json(result);
		});
	} else {
		res.status(400);
		res.json(result);
	}
});

app.post('/api/user/:user/stats', function (req, res) {
	var result = { success:false};
	//if(isEmptyObject(result["error"])){
	let sql = 'INSERT INTO score (username, score) ' +
		' VALUES(?,0);';
	let user = req.params.user;
	let params = [user];

	db.run(sql, params, function (err){
		if (err) {
			res.status(500); 
				result["error"] = err.message;
		} else {
			if(this.changes!=1){
				result["error"] = "Not updated";
				res.status(404);
			} else {
				res.status(200);
				result.success = true;
			}
		}
		res.json(result);
	});
	/*
	} else {
		res.status(400);
		res.json(result);
	}
	*/
});

app.put('/api/user/:user/stats', function (req, res) {
	var result = { success:false};
	//if(isEmptyObject(result["error"])){
		let sql = 'UPDATE score SET score=score+1 WHERE username=?';
		let user = req.params.user;
		let params = [user];

		db.run(sql, params, function (err){
  			if (err) {
				res.status(500); 
    				result["error"] = err.message;
  			} else {
				if(this.changes!=1){
    					result["error"] = "Not updated";
					res.status(404);
				} else {
					res.status(200);
					result.success = true;
				}
			}
			res.json(result);
		});
	/* 
	}
	else {
		res.status(400);
		res.json(result);
	}
	*/
});

app.listen(port, function () {
  	console.log('Example app listening on port '+port);
});

// db.close();

