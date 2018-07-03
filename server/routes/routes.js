//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Candidate = require('../../models/Candidate');
var Expense = require('../../models/Expense');
var Job = require('../../models/Job');
router.get('/', function(req, res){
  res.render('index')
});

router.route('/viewAppliedJobIds')
.get(function(req, res) {
  console.log( req.query.Candidate_id);
 const doc = {
     Candidate_id:parseInt(req.query.Candidate_id)
 };
 console.log(doc);

 Candidate.find(
   doc,{"_id":0,"Job_Id_Applied":1}
 , function(err, json) {
  if (err)
   res.send(err);
   console.log(json);
  res.json(json);
 });
});
router.route('/viewAppliedJobDetails')
.get(function(req, res) {
    console.log( "into JobDetails");
  console.log( req.query.Job_Id_Applied);

var input=req.query.Job_Id_Applied.split(",").map(Number).filter(Boolean);


 Job.find({"Job_id":{$in:input}}, function(err, json) {
  if (err)
   res.send(err);
   console.log(json);
  res.json(json);
 });
});

router.route('/jobs')
.get(function(req, res) {
 Job.find({},{"_id":0}, function(err, json) {
  if (err)
   res.send(err);
   console.log(json);
  res.json(json);
 });
});
router.route('/exp')
.get(function(req, res) {
 Job.find({},{"_id":0}, function(err, json) {
  if (err)
   res.send(err);
   console.log(json);
  res.json(json);
 });
});

router.route('/insert')
.post(function(req,res) {
 var expense = new Expense();
  expense.description = req.body.desc;
  expense.amount = req.body.amount;
  expense.month = req.body.month;
  expense.year = req.body.year;
expense.save(function(err) {
      if (err)
        res.send(err);
      res.send('Expense successfully added!');
  });
})
router.route('/update')
.post(function(req, res) {
 const doc = {
     description: req.body.description,
     amount: req.body.amount,
     month: req.body.month,
     year: req.body.year
 };
 console.log(doc);
  Expense.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Expense successfully updated!');
  });
});
router.get('/delete', function(req, res){
 var id = req.query.id;
 Expense.find({_id: id}).remove().exec(function(err, expense) {
  if(err)
   res.send(err)
  res.send('Expense successfully deleted!');
 })
});
router.get('/getAll',function(req, res) {
 var monthRec = req.query.month;
 var yearRec = req.query.year;
 if(monthRec && monthRec != 'All'){
  Expense.find({$and: [ {month: monthRec}, {year: yearRec}]}, function(err, expenses) {
   if (err)
    res.send(err);
   res.json(expenses);
  });
 } else {
  Expense.find({year: yearRec}, function(err, expenses) {
   if (err)
    res.send(err);
   res.json(expenses);
  });
 }
});
module.exports = router;
