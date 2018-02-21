/*jshint esversion: 6*/

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
      done();
    });
  });

  it('should throw an error if bill is not a string', function(){
    expect(() => {
      createBill(0);
    }).to.throw(TypeError);
  });

  it('should throw an error if bill is not valid name', function() {
    expect(() => {
      createBill("random-text");
    }).to.throw(TypeError);
  });

  it('should throw an error if bill is valid by the options are not', function() {
    expect(() => {
      createBill("BILLS-113hr1033rs", {session: "not-a-number"});
    }).to.throw(TypeError);
  });

  it('should throw an error if bill is valid by the options are not', function() {
    expect(() => {
      createBill("BILLS-113hr1033rs", {session: 3});
    }).to.throw(TypeError);
  });

  it('should save bills to the database', function() {
    createBill("BILLS-113hr1033rs", {session: 2});
  });
});
