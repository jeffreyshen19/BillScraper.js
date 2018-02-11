/*jshint esversion: 6*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var cleanBillStatus = require("../../lib/parser/cleanBillStatus");
var getBillStatus = require("../../lib/scraper/getBillStatus");

describe('cleanBillStatus', function() {
  it('should throw an error if bill is not an object', function() {
    expect(() => {
      cleanBillStatus(1, (res) => {});
    }).to.throw(TypeError);
  });

  it('should throw an error if there is no callback', function() {
    expect(() => {
      cleanBillStatus({});
    }).to.throw(TypeError);
  });

  it('should throw an error if the bill is not valid', function() {
    expect(() => {
      cleanBillStatus({}, (res) => {});
    }).to.throw(Error);
  });

  it('should return an object if the bill is valid', function(){
    getBillStatus("BILLSTATUS-115sres99", (res) => {
      cleanBillStatus(res, function(cleanedRes){
        expect(cleanedRes).to.be.an("object").that.is.not.empty;
      });
    });
  });
});
