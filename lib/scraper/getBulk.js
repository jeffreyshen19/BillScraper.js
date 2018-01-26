var request = require('request');
var htmlparser = require("htmlparser");
var select = require('soupselect').select;

var validBillTypes = ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"];

/**
 * Asynchronously accesses list of bills as an array
 * @param {string} billType - The type of bill (hr, s, hres, hjres, hconres, sconres, sjres, sres)
 * @param {function} callback - Callback (with one paramater)
 * @param {object} options - Options (Optional)
 * @example
 * getBulk("sres", function(res){
 *  //res is an array
 * });
 */

var getBulk = function(billType, callback, options){
  options = options || {};
  if(typeof billType != "string") throw new TypeError("'billType' needs to be a String");
  if(callback == null) throw new TypeError("A callback needs to be included");

  billType = billType.toLowerCase();
  if(!validBillTypes.includes(billType)) throw new TypeError("'billType' needs to be a valid bill type");

  var requestUrl = "https://www.gpo.gov/fdsys/bulkdata/BILLSTATUS/115/" + billType;

  request(requestUrl, function (err, res, rawHTML){ //Access the GPO website as HTML
    if(err) throw err;

    new htmlparser.Parser(new htmlparser.DefaultHandler(function(error, dom){
      if(error) throw error;
      else{
        var table = select(dom, "#bulkdata .styles3 td a"); //Select the relevant HTMl tags
        var arrayRes = [];

        for(var i = 1; i < table.length; i++) arrayRes.push(table[i].children[0].raw.trim().replace(/\.xml/gi, "")); //Clean up and push the data to the result array

        callback(arrayRes);
      }
    })).parseComplete(rawHTML);

  });
};

module.exports = getBulk;
