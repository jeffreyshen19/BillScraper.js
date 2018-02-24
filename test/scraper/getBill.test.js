/*jshint esversion: 6*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var getBill = require("../../lib/scraper/getBill");

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
    getBill("BILLS-115hr1001ih", (res) => {
      expect(res).to.be.an("object").that.is.not.empty;
    });
  });

  it('should throw an error if the billName is valid but the options are not', function() {
    expect(() => {
      getBill("BILLS-115hr1001ih", (res) => {}, {session: 0});
    }).to.throw(TypeError);
  });

  it('should return an object if the billName is valid and options are valid', function() {
    getBill("BILLS-115hr1001ih", (res) => {
      expect(res).to.be.an("object").that.is.not.empty;
    }, {session: 1});
  });

  it('should return an object if the billName is valid and options are valid', function() {
    getBill("BILLS-114s1024rs", (res) => {
      expect(res).to.be.an("object").that.is.not.empty;
    }, {session: 2});
  });
});
