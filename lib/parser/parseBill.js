var request = require('request');
var parseXml = require('xml2js').parseString;
var util = require('util');

/**
 * Asynchronously parses the output from getBill.js into a more manageable object.
 * @param {object} bill - JSON bill (result from getBill.js)
 * @param {function} callback - Callback
 * @return {object} - JSON result
 * @example
 * getBill("BILLSTATUS-115sres99", function(res){
 *   parseBill(res, function(parsedResult){
 *     //parsedResult is JSON
 *   });
 * });
 */

var parseBill = function(bill, callback){
  if(typeof bill != "object") throw new TypeError("'bill' needs to be an object");
  if(callback == null) throw new TypeError("A callback needs to be included");

  var billCopy = Object.assign({}, bill);

  //Remove extraneous fields
  if("constitutionalAuthorityStatementText" in bill) delete billCopy.constitutionalAuthorityStatementText;

  //Clean up arrays with only one element
  if(typeof billCopy.billType == "object") billCopy.billType = billCopy.billType[0];

  //TODO: Detect if bill is not a valid  bill
  console.log(util.inspect(billCopy, false, null));

  //callback(res);
};

module.exports = parseBill;
