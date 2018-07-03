//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var expenseSchema = new Schema({
  description: String,
  amount: Number,
  month: String,
  year: Number

});
var jobsSchema= new Schema({
  jobid: Number,
  title:String,
  min_exp:Number,
  max_exp:Number,
  techstack:Array,
  desc:String
});



//module.exports = mongoose.model('expenses', expenseSchema);
module.exports = mongoose.model('jobs', jobsSchema);
