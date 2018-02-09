var mongoose = require('mongoose');

var billScraper = function(){
  //Scraper
  this.getBulkStatus = require("./lib/scraper/getBulkStatus.js");
  this.getBillStatus = require("./lib/scraper/getBillStatus.js");
  this.getBulk = require("./lib/scraper/getBulk.js");
  this.getBill = require("./lib/scraper/getBill.js");

  //Parser
  this.cleanBillStatus = require("./lib/parser/cleanBillStatus.js");
  this.cleanBill = require("./lib/parser/cleanBill.js");
  this.printBill = require("./lib/parser/printBill.js");
  this.tagBill = require("./lib/parser/tagBill.js");

  //Constants
  this.validBillTypes = ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"];
};

module.exports = billScraper;
