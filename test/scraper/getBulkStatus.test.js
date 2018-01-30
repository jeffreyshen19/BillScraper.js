/*jshint esversion: 6*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var getBulkStatus = require("../../lib/scraper/getBulkStatus.js");

describe('getBulkStatus', function() {
  it('should throw an error if billType is not a string', function() {
    expect(() => {
      getBulkStatus(1, (res) => {});
    }).to.throw(TypeError);
  });

  it('should throw an error if there is no callback', function() {
    expect(() => {
      getBulkStatus("");
    }).to.throw(TypeError);
  });

  it('should throw an error if the billType is not valid', function() {
    expect(() => {
      getBulkStatus("", (res) => {});
    }).to.throw(TypeError);
  });

  it('should return an array if the billType is valid', function() {
    getBulkStatus("hr", (res) => {
      expect(res).to.be.an("array").that.is.not.empty;
    });
  });
});
