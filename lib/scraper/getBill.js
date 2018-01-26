var request = require('request');
var parseXml = require('xml2js').parseString;

/**
 * Asynchronously returns the data for the given bill as JSON
 * @param {string} billName - The name of bill (i.e. "BILLSTATUS-115sres99")
 * @param {function} callback - Callback
 * @return {object} - JSON result
 * @example
 * getBill("BILLSTATUS-115sres99", function(res){
 *  //res is a JSON object
 * });
 */

var getBill = function(billName, callback){
  if(typeof billName != "string") throw new TypeError("'billName' needs to be a String");
  if(callback == null) throw new TypeError("A callback needs to be included");
  if(!/^BILLSTATUS-115(sres|sjres|sconres|s|hres|hr|hjres|hconres)[0-9]+$/i.test(billName)) throw new TypeError("'billName' needs to be a valid bill name");

  var requestUrl = "https://www.gpo.gov/fdsys/bulkdata/BILLSTATUS/115/" + billName.replace("BILLSTATUS-115", "").replace(/[0-9]+/g, "") + "/" + billName + ".xml";

  request(requestUrl, function (err, res, xml) { //Access the XML file from the GPO
    if(err) throw err;
    if(xml.indexOf("<title>Content Unavailable</title>") != -1) throw new TypeError("'billName' needs to be an actual bill");

    parseXml(xml, function (error, json) {
      if(err) throw err;
      callback(json.billStatus.bill);
    });
  });
};

module.exports = getBill;
