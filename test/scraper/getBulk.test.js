/*jshint esversion: 6*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var getBulk = require("../../lib/scraper/getBulk.js");

describe('getBulk', function() {
  it('should throw an error if billType is not a string', function() {
    expect(() => {
      getBulk(1, (res) => {});
    }).to.throw(TypeError);
  });

  it('should throw an error if there is no callback', function() {
    expect(() => {
      getBulk("");
    }).to.throw(TypeError);
  });

  it('should throw an error if the billType is not valid', function() {
    expect(() => {
      getBulk("", (res) => {});
    }).to.throw(TypeError);
  });

  it('should return an array if the billType is valid', function() {
    getBulk("hr", (res) => {
      expect(res).to.be.an("array").that.is.not.empty;
    });
  });

  it('should throw an error if the billType is valid but the options are not', function() {
    expect(() => {
      getBulk("hr", (res) => {}, {congress: 111});
    }).to.throw(TypeError);
  });

  it('should return an array if the billType is valid and options are supplied', function() {
    getBulk("hr", (res) => {
      expect(res).to.be.an("array").that.is.not.empty;
    }, {congress: 113});
  });
});
