var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1/mydb"
app.use(express.static(__dirname + '/public'));

MongoClient.connect(url, function(err, db) {
	if(!err) {
		app.get('/', function(req, res) {
			res.sendFile(__dirname + '/form.html')
		})

		app.get('/addNew', function(req, res) {
			db.collection('items').drop()
			db.collection('items').insert(req.query)

		})

		app.get('/display', function(req, res) {
			db.collection('items').find({}, {_id: 0}).toArray(function(err, data) {
				console.log(JSON.stringify(data))
				res.send(data)
			})
		})

		app.get('/count', function(req, res) {
			db.collection('items').count(function(err, count) {
				console.log("Count: %s", count)
				res.end("Count: " + count)
			})
		})

		app.get('/drop', function(req, res) {
			db.collection('items').drop()
			console.log("Items collection has been dropped.")
			res.end("Items collection has been dropped.")
		})

		app.listen(5000);
	}
})
