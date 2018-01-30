/*jshint esversion: 6*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var getBillStatus = require("../../lib/scraper/getBillStatus.js");

describe('getBillStatus', function() {
  it('should throw an error if billName is not a string', function() {
    expect(() => {
      getBillStatus(1, (res) => {});
    }).to.throw(TypeError);
  });

  it('should throw an error if there is no callback', function() {
    expect(() => {
      getBillStatus("");
    }).to.throw(TypeError);
  });

  it('should throw an error if the billName is not valid', function() {
    expect(() => {
      getBillStatus("", (res) => {});
    }).to.throw(TypeError);
  });

  it('should return an object if the billName is valid', function() {
    getBillStatus("BILLSTATUS-115sres99", (res) => {
      expect(res).to.be.an("object").that.is.not.empty;
    });
  });
});
