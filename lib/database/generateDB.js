var createBill = require("./createBill");
var getBulk = require("../scraper/getBulk");

var validBillTypes = ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"];

/**
 * Automatically generates the entire database of bills
 * @example
 * generateDB()
 */

var generateDB = function(type, congress, session){
  //TODO: check validity of each param

  getBulk(type, function(res){
    console.log(res[res.length - 1]);
    res.forEach(function(bill){
      //console.log(bill);
      createBill(bill);
    });
  }, {
    congress: congress,
    session: session
  });
};

module.exports = generateDB;
