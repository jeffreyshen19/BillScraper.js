var createBill = require("./createBill");
var getBulk = require("../scraper/getBulk");

var validBillTypes = ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"];

/**
 * Automatically generates the entire database of bills
 * @example
 * generateDB()
 */

var generateDB = function(type, congress, session){
  getBulk(type, function(res){
    var i = 0;
    var interval = setInterval(function(){
      if(i == res.length) clearInterval(interval);
      try{
        createBill(res[i]);
      }
      catch(e){
        console.log("Unable to save " + res[i]);
      }
      i++;
    }, 100);
  }, {
    congress: congress,
    session: session
  });
};

module.exports = generateDB;
