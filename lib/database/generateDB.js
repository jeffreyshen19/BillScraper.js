var createBill = require("./createBill");
var getBulk = require("../scraper/getBulk");

var validBillTypes = ["s", "hr"];

/**
 * Automatically generates the entire database of bills
 * @example
 * generateDB("s", 115, 1)
 */

var generateDB = function(type, congress, session){
  if(!validBillTypes.includes(type)) throw new TypeError("The bill type needs to be either s or hr", "generateDB.js", 15);
  if(typeof congress != "number" || congress < 113 || congress > 115) throw new TypeError("congress must be a number between 113 and 115", "generateDB.js", 16);
  if(typeof session != "number" || (session != 1 && session != 2)) throw new TypeError("session must be a number that is either 1 or 2", "generateDB.js", 17);

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
