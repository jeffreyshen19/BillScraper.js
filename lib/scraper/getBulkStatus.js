var request = require('request');
var htmlparser = require("htmlparser");
var select = require('soupselect').select;

var validBillTypes = ["s", "hr"];

/**
 * Asynchronously accesses list of bill statuses as an array
 * @param {string} billType - The type of bill (hr, s)
 * @param {function} callback - Callback (with one paramater)
 * @param {object} options - Options (Optional)
 * @param {integer} options.congress - Which congress (Default: 115)
 * @example
 * getBulkStatus("hr", function(res){
 *  //res is an array
 * });
 */

var getBulkStatus = function(billType, callback, options){
  options = options || {};
  var congress = ("congress" in options) ? options.congress : 115;

  if(typeof congress != "number" || congress < 113 || congress > 115) throw new TypeError("'options.congress' must be a number between 113 and 115", "getBulkStatus.js", 23);
  if(typeof billType != "string") throw new TypeError("'billType' needs to be a String", "getBulkStatus.js", 24);
  if(callback == null) throw new TypeError("A callback needs to be included", "getBulkStatus.js", 25);

  billType = billType.toLowerCase();
  if(!validBillTypes.includes(billType)) throw new TypeError("'billType' needs to be a valid bill type", "getBulkStatus.js", 28);

  var requestUrl = "https://www.gpo.gov/fdsys/bulkdata/BILLSTATUS/" + congress + "/" + billType;

  request(requestUrl, function (err, res, rawHTML){ //Access the GPO website as HTML
    if(err) throw err;

    new htmlparser.Parser(new htmlparser.DefaultHandler(function(error, dom){
      if(error) throw error;
      else{
        var table = select(dom, "#bulkdata .styles3 td a"); //Select the relevant HTMl tags
        var arrayRes = [];

        for(var i = 1; i < table.length - 1; i++) arrayRes.push(table[i].children[0].raw.trim().replace(/\.xml/gi, "")); //Clean up and push the data to the result array

        callback(arrayRes);
      }
    })).parseComplete(rawHTML);

  });
};

module.exports = getBulkStatus;
