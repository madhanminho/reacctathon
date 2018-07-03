//models/Expense.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expSchema= new Schema({
  jobid: Number,
  title:String,
  min_exp:Number,
  max_exp:Number,
  techstack:Array,
  desc:String
});

module.exports = mongoose.model('jobs', expSchema);
