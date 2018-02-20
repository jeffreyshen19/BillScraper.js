/*jshint esversion: 6*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var cleanBillStatus = require("../../lib/database/generateDB");
var mongoose = require("mongoose");

describe('generateDB', function() {
  before(function(done){
    mongoose.connect('mongodb://localhost/bills');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error connecting to database'));
    db.once('open', function() {
      console.log('Connected to database');
      done();
    });
  });
});
