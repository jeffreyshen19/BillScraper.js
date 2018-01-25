/*jshint esversion: 6*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var getBill = require("../lib/scraper/getBill.js");

describe('getBill', function() {
  it('should throw an error if billName is not a string', function() {
    expect(() => {
      getBill(1, (res) => {});
    }).to.throw(TypeError);
  });

  it('should throw an error if there is no callback', function() {
    expect(() => {
      getBill("");
    }).to.throw(TypeError);
  });

  it('should throw an error if the billName is not valid', function() {
    expect(() => {
      getBill("", (res) => {});
    }).to.throw(TypeError);
  });

  it('should return an object if the billName is valid', function() {
    getBill("BILLSTATUS-115sres99", (res) => {
      expect(res).to.be.an("object").that.is.not.empty;
    });
  });
});
