/*jshint esversion: 6*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var printBill = require("../../lib/parser/printBill");
var getBill = require("../../lib/scraper/getBill");

describe('printBill', function() {
  it('should throw an error if bill is not an object', function() {
    expect(() => {
      printBill(1, (res) => {});
    }).to.throw(TypeError);
  });

  it('should throw an error if there is no callback', function() {
    expect(() => {
      printBill({});
    }).to.throw(TypeError);
  });

  it('should throw an error if the bill is an invalid object', function() {
    expect(() => {
      printBill({entry1: 'testing', entry2: 'error', entry3: 'handling'}, (res) => {});
    }).to.throw(Error)
  })

  it('should return an object if the bill is valid', function() {
    getBill("BILLS-115hr1001ih", (res) => {
      printBill(res, function(printedRes){
        expect(printedRes).to.be.an("object").that.is.not.empty;
      });
    });
  });

  it('should return an object if the bill is valid', function() {
    getBill("BILLS-114s1024rs", (res) => {
      printBill(res, function(printedRes){
        expect(printedRes).to.be.an("object").that.is.not.empty;
      });
    }, {session: 2});
  });
});
