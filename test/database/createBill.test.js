var assert = require('chai').assert;
var expect = require('chai').expect;
var createBill = require("../../lib/database/createBill");
var mongoose = require("mongoose");

describe('createBill', function() {
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
