/**
 * Asynchronously combines all the text fields from cleanBill.js into a more manageable JSON object
 * @param {object} bill - JSON bill (result from cleanBill.js)
 * @param {function} callback - Callback
 * @return {object} - JSON result
 * @example
 * getBill("BILLSTATUS-115sres99", function(res){
 *   cleanBill(res, function(parsedResult){
 *     printBill(parsedResult, function(printedResult){
 *        //printedResult is JSON
 *     });
 *   });
 * });
 */

var printBill = function(bill, callback){
  if(typeof bill != "object") throw new TypeError("'bill' needs to be an object");
  if(callback == null) throw new TypeError("A callback needs to be included");

  var res = {

  };

  try{
    callback(bill);
  }
  catch(e){
    throw new Error("JSON supplied must be a valid bill");
  }
};

module.exports = printBill;
