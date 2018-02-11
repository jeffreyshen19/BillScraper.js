var request = require('request');
var parseXml = require('xml2js').parseString;

/**
 * Asynchronously returns the data for the given bill as JSON
 * @param {string} billName - The name of bill (i.e. "BILLS-115hr1001ih")
 * @param {function} callback - Callback
 * @param {object} options - Options (Optional)
 * @param {integer} options.session - Which congressional session (default: 1)
 * @param {boolean} options.clean - Enable / disable automatic cleaning of bill (default: true)
 * @return {object} - JSON result
 * @example
 * getBill("BILLS-115hr1001ih", function(res){
 *  //res is a JSON object
 * });
 */

var getBill = function(billName, callback, options){
  options = options || {};
  var clean = ("clean" in options) ? options.clean : true;
  var session = ("session" in options) ? options.session : 1;

  if(typeof clean != "boolean") throw new TypeError("'options.clean' must be a boolean");
  if(typeof session != "number" || (session != 1 && session != 2)) throw new TypeError("'options.session' must be either 1 or 2");
  if(typeof billName != "string") throw new TypeError("'billName' needs to be a String");
  if(callback == null) throw new TypeError("A callback needs to be included");
  if(!/^BILLS-11[3-5](sres|sjres|sconres|s|hres|hr|hjres|hconres)[0-9]+[a-z0-9]{2,}$/i.test(billName)) {
    console.log(billName);
    throw new TypeError("'billName' needs to be a valid bill name");
  }

  var requestUrl = "https://www.gpo.gov/fdsys/bulkdata/BILLS/" + billName.replace("BILLS-", "").replace(/(sres|sjres|sconres|s|hres|hr|hjres|hconres).+$/g, "") + "/" + session + "/" + billName.replace(/BILLS-11[3-5]/, "").replace(/[0-9]+[a-z0-9]{2,}$/g, "") + "/" + billName + ".xml";

  request(requestUrl, function (err, res, xml){ //Access the XML file from the GPO
    if(err) throw err;
    if(xml.indexOf("<title>Content Unavailable</title>") != -1) throw new TypeError("'billName' needs to be an actual bill");

    //Clean up extraneous tags
    xml = xml.replace(/<\/?short-title>/gi, "").replace(/<\/?(quote|term)>/gi, "\"");

    //TODO: Delete paragraphs that have been deleted
    //TODO: Add quotes around quoted paragraphs.
    //xml = xml.replace(/<paragraph[^>]*changed="deleted"[^>]*>(.|\n)*<\/paragraph>/gi, "");

    //TODO: make this work with all types of bills

    parseXml(xml, function (error, json){
      if(err) throw err;

      json = json.bill//['legis-body'][0].section;

      delete json.metadata;

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

module.exports = getBill;
