var request = require('request');

/**
 * Returns the data for the given bill as JSON
 * @param {string} billName - The name of bill (i.e. "BILLSTATUS-115sres99")
 * @return {object} - JSON result
 */

module.exports = function(billName){
  if(typeof billName != "string") throw new TypeError("'billName' needs to be a String");
  billName = billName.toLowerCase();

};
