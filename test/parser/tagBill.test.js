/*jshint esversion: 6*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var printBill = require("../../lib/parser/printBill");
var tagBill = require("../../lib/parser/tagBill");
var getBill = require("../../lib/scraper/getBill");

describe('tagBill', function() {
  it('should throw an error if bill is not an object', function() {
    expect(() => {
      tagBill(1, (res) => {});
    }).to.throw(TypeError);
  });

  it('should throw an error if there is no callback', function() {
    expect(() => {
      tagBill({});
    }).to.throw(TypeError);
  });

  it('should throw an error if the bill is an invalid object', function() {
    expect(() => {
      tagBill({entry1: 'testing', entry2: 'error', entry3: 'handling'}, (res) => {});
    }).to.throw(Error)
  })

  it('should return an object if the bill is valid', function(){
    getBill("BILLS-113hr1033rs", function(res){
      printBill(res, function(parsedResult){
        tagBill(parsedResult, function(tags){
          expect(tags).to.be.an("object").that.is.not.empty;
       });
     });
    }, {session: 2});
  });
});
