/*jshint esversion: 6*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var cleanBill = require("../../lib/parser/cleanBill");
var getBill = require("../../lib/scraper/getBill");

describe('cleanBill', function() {
  it('should throw an error if bill is not an object', function() {
    expect(() => {
      cleanBill(1, (res) => {});
    }).to.throw(TypeError);
  });

  it('should throw an error if there is no callback', function() {
    expect(() => {
      cleanBill({});
    }).to.throw(TypeError);
  });

  it('should throw an error if the bill is an invalid object', function() {
    expect(() => {
      cleanBill({entry1: 'testing', entry2: 'error', entry3: 'handling'}, (res) => {});
    }).to.throw(Error);
  });

  it('should return an object if the bill is valid', function(){
    getBill("BILLS-115hr1001ih", (res) => {
      cleanBill(res, function(cleanedRes){
        expect(cleanedRes).to.be.an("object").that.is.not.empty;
      });
    });
  });
});
