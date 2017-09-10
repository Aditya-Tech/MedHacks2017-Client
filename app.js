const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var db;
var uri;
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://aditya:aditya@ds129374.mlab.com:29374/patiant-data', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/new_patient', (req, res) => {
  db.collection('patient-data').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('NewPatient.ejs', {patients: result});
  })
})

app.get('/search_patient', (req, res) => {
  // db.collection('patient-data').save(req.body, (err, result) => {
  //   if (err) return console.log(err)
  //   console.log('saved to database')
  //   res.redirect('patient-search')
  // })
	db.collection('patient-data').find().toArray((err, result) => {
	    if (err) return console.log(err);
	    res.render('SearchPatient.ejs', {patients: result});
	})
})

app.post("/verify_patient", (req, res) => {
	console.log(req);
	res.redirect('patient-search')
})

app.get("/getAllPatients", function(req, res) {
	db.collection("patient-data").find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get patients.");
    } else {
      res.status(200).json(docs);
    }
  });
})