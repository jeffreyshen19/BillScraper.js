/*jshint esversion: 6*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var generateDB = require("../../lib/database/generateDB");
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

  it('should throw an error if type is not a valid bill type', function(){
    expect(() => {
      generateDB("random-text", 115, 1);
    }).to.throw(TypeError);
  });

  it('should throw an error if congress is not a valid congress', function() {
    expect(() => {
      generateDB("s", 98, 1);
    }).to.throw(TypeError);
  });

  it('should throw an error if session is not 1 or 2', function() {
    expect(() => {
      generateDB("s", 115, 3);
    }).to.throw(TypeError);
  });

  it('should generate a database', function() {
    generateDB("s", 115, 1);
  });
});
