var request = require('request');
var parseXml = require('xml2js').parseString;

/**
 * Asynchronously returns the data for the given bill status as JSON
 * @param {string} billName - The name of bill (i.e. "BILLSTATUS-115sres99")
 * @param {function} callback - Callback
 * @param {object} options - Options (Optional)
 * @param {boolean} options.clean - Enable / disable automatic cleaning of bill (default: true)
 * @return {object} - JSON result
 * @example
 * getBillStatus("BILLSTATUS-115sres99", function(res){
 *  //res is a JSON object
 * });
 */

var getBillStatus = function(billName, callback, options){
  options = options || {};
  var clean = ("clean" in options) ? options.clean : true;

  if(typeof clean != "boolean") throw new TypeError("'options.clean' must be a boolean");
  if(typeof billName != "string") throw new TypeError("'billName' needs to be a String");
  if(callback == null) throw new TypeError("A callback needs to be included");
  if(!/^BILLSTATUS-11[3-5](sres|sjres|sconres|s|hres|hr|hjres|hconres)[0-9]+$/i.test(billName)) throw new TypeError("'billName' needs to be a valid bill name");

  var requestUrl = "https://www.gpo.gov/fdsys/bulkdata/BILLSTATUS/" + billName.replace("BILLSTATUS-", "").replace(/(sres|sjres|sconres|s|hres|hr|hjres|hconres).+$/g, "") + "/" + billName.replace(/BILLSTATUS-11[3-5]/, "").replace(/[0-9]+/g, "") + "/" + billName + ".xml";


  request(requestUrl, function (err, res, xml){ //Access the XML file from the GPO
    if(err) throw err;
    if(xml.indexOf("<title>Content Unavailable</title>") != -1) throw new TypeError("'billName' needs to be an actual bill");

    parseXml(xml, function (error, json){
      if(err) throw err;
      json = json.billStatus.bill[0];

      if(clean){
        var cleanBill = require("../parser/cleanBill");
        cleanBill(json, function(cleanedRes){
          callback(cleanedRes);
        });
      }
      else{
        callback(json);
      }
    });
  });
};

module.exports = getBillStatus;
