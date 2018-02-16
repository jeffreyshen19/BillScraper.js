var createBill = require("./createBill");
var getBulk = require("../scraper/getBulk");

var validBillTypes = ["s", "hr"];

/**
 * Automatically generates the entire database of bills
 * @example
 * generateDB()
 */

var generateDB = function(type, congress, session){
  //TODO: check that type is valid

  if (type != validBillTypes[0] && type != validBillTypes[1]){
    throw new TypeError("The Bill type is not one of the valid bill types which needs to be of either the Senate or House('s', 'hr').", "generateDB.js", 15);
  }

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
